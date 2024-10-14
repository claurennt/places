import axios from 'axios';
import { IPlace, IUser, Place, User } from '../db';

import { ApiError, placeIconMap, checkDocumentExistence } from '../helpers';
import { fetchPlaceDetails, FetchPlaceResponse } from '../helpers/fetchPlace';

export const createPlace = async (args: {
  _userId: IUser['_id'];
  data: { name?: string; town: string; country: string };
}): Promise<IPlace | string | undefined | FetchPlaceResponse[]> => {
  try {
    const {
      name: inputName,
      town: inputTown,
      country: inputCountry,
    } = args.data;

    const { _userId } = args;

    const user = (await checkDocumentExistence<IUser>(_userId, User)) as IUser;

    if (!user) {
      throw new Error('User not found');
    }

    if (!inputTown || (!inputName && !inputTown))
      throw new Error('Please provide city name');

    const placeData = await fetchPlaceDetails(
      inputName,
      inputTown,
      inputCountry
    );

    // if the query has multiple results return it for the user to select the relevant one
    if (placeData.length > 1) {
      return placeData;
    }

    const [
      {
        name,
        lat,
        lon,
        type,
        address: { road, town, state, postcode, country },
      },
    ] = placeData;

    // create new place
    const newPlace = new Place({
      name,
      coordinates: [lat, lon],
      address: { road, town, state, postcode, country },
      icon: placeIconMap[type as keyof typeof placeIconMap],
      color: 'lightblue',
      type,
      users: [_userId],
    });

    await newPlace.save();

    // update the User document's places property with the new Place's _id
    (user as IUser).places.push(newPlace._id);

    await user.save();

    return newPlace;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error);
    }
  }
};
