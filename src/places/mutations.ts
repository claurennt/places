import axios from 'axios';
import { IPlace, IUser, Place, User } from '../db/index';
import { checkDocumentExistence } from '../helpers/index';
import { placeIconMap } from '../helpers/index';
import mongoose from 'mongoose';

export const createPlace = async (args: {
  _userId: IUser['_id'];
  input: { name?: string; town: string; country: string };
}): Promise<Error | IPlace> => {
  try {
    const {
      name: inputName,
      town: inputTown,
      country: inputCountry,
    } = args.input;

    const { _userId } = args;

    const user = await checkDocumentExistence(_userId, User);

    if (!user) {
      return new Error('User not found');
    }

    if (!inputTown || (!inputName && !inputTown))
      return new Error('Please provide city name');

    // send a request to retrieve more information about the place
    const encodedNameParameter = encodeURIComponent(inputName || '');
    const encodedCityParamenter = encodeURIComponent(inputTown || '');
    const encodedCountryParameter = encodeURIComponent(inputCountry || '');

    const { data: placeData } = await axios.get(
      `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodedNameParameter}+${encodedCityParamenter}+${encodedCountryParameter}&format=jsonv2&limit=20`
    );

    // if the query has multiple results return it for the user to select the relevant one
    if (placeData.length > 1) {
      return placeData;
    }

    const {
      name,
      lat,
      lon,
      type,
      address: { road, town, county, state, postcode, country },
    } = placeData[0];

    // create new place
    const newPlace = new Place({
      name,
      coordinates: [lat, lon],
      address: { road, town, county, state, postcode, country },
      icon: placeIconMap[type],
      color: 'lightblue',
      type,
      users: [_userId],
    });

    await newPlace.save();

    // update the User document's places property with the new Place's _id
    user.places.push(newPlace._id);

    await user.save();

    return newPlace;
  } catch (err) {
    if (
      err instanceof mongoose.mongo.MongoError &&
      err.name === 'MongoServerError' &&
      err.code === 11000
    ) {
      const [[key, value]] = Object.entries((err as any).keyValue);

      return new Error(
        `User creation failed: ${key} '${value}' already exists.`
      );
    }
    return err as Error;
  }
};
