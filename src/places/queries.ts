import { Place, IPlace } from '@db';

import { ApiError, checkDocumentExistence } from '@helpers';

export const getPlace = async (args: {
  _id: IPlace['_id'];
}): Promise<IPlace | string> => {
  try {
    const { _id } = args;

    const foundPlace = await checkDocumentExistence<IPlace>(_id, Place);
    if (!foundPlace)
      return `Place not found: a place with _id "${_id}" does not exist.`;

    return foundPlace;
  } catch (error) {
    throw new ApiError(error);
  }
};

// TODO : getPlaces by argument
