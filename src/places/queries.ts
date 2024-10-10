import { Place, IPlace } from '../db/index';
import { checkDocumentExistence } from '../helpers/index';

export const getPlace = async (args: {
  _id: IPlace['_id'];
}): Promise<IPlace | string | Error | null> => {
  try {
    const { _id } = args;

    const foundPlace = checkDocumentExistence(_id, Place);
    if (!foundPlace)
      return `Place not found: a place with _id "${_id}" does not exist.`;

    return foundPlace;
  } catch (err) {
    console.log(err);

    return err as Error;
  }
};

// TODO : getPlaces by argument
