import { User, IUser, IPlace } from '../db/index.js';
import { checkDocumentExistence } from '../helpers/users.js';

export const getUser = async (args: {
  _id: IUser['_id'];
}): Promise<IUser | string | Error | null> => {
  try {
    const { _id } = args;

    const foundUser = checkDocumentExistence(_id, User);
    if (!foundUser)
      return `User not found: a user with _id "${_id}" does not exist.`;

    return foundUser;
  } catch (err) {
    console.log(err);

    return err;
  }
};

export const getUsersByPlaceCity = async (args: {
  placeCity: IPlace['city'];
}): Promise<IUser[] | string | Error> => {
  try {
    const { placeCity: city } = args;

    const foundUser: IUser[] | null = await User.find().populate({
      path: 'places',
      match: { city },
    });

    if (!foundUser.length) return `No users found w`;

    return foundUser;
  } catch (err) {
    console.log(err);

    return err;
  }
};
