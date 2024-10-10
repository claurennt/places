import axios from 'axios';
import { IPlace, IUser, Place, User } from '@db';

import { ApiError, placeIconMap, checkDocumentExistence } from '@helpers';

export const createPlace = async (args: {
  _userId: IUser['_id'];
  input: { name?: string; town: string; country: string };
}): Promise<IPlace> => {
  try {
    const {
      name: inputName,
      town: inputTown,
      country: inputCountry,
    } = args.input;

    const { _userId } = args;

    const user = await checkDocumentExistence<IUser>(_userId, User);

    if (!user) {
      throw new Error('User not found');
    }

    if (!inputTown || (!inputName && !inputTown))
      throw new Error('Please provide city name');

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
  } catch (error) {
    throw new ApiError(error as any);
  }
};
