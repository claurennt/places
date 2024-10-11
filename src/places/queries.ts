import { Place, IPlace } from '@db';

import { ApiError, checkDocumentExistence } from '@helpers';

export const getPlaceById = async (args: {
  _id: IPlace['_id'];
}): Promise<IPlace | string | undefined> => {
  try {
    const { _id } = args;

    const foundPlace = (await checkDocumentExistence<IPlace>(
      _id,
      Place
    )) as IPlace | null;

    if (!foundPlace)
      return `Place not found: a place with _id "${_id}" does not exist.`;

    return foundPlace;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error);
    }
  }
};

export const getPlacesByFilter = async (args: {
  town?: string;
  country?: string;
}): Promise<IPlace[] | string | undefined> => {
  try {
    const foundPlaces = (await checkDocumentExistence(args, Place)) as IPlace[];

    return foundPlaces;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error);
    }
  }
};
