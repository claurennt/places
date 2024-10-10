import { User, IUser, IPlace } from '../db/index';
import { checkDocumentExistence } from '../helpers/index';

type UserPublicData = {
  username: string;
  avatar: string;
};

export const getUser = async (args: {
  _id: IUser['_id'];
}): Promise<IUser | UserPublicData | string | Error> => {
  try {
    const { _id } = args;

    const foundUser = await checkDocumentExistence(_id, User);

    if (!foundUser)
      return `User not found: a user with _id "${_id}" does not exist.`;

    const { username, avatar } = foundUser;

    // TODO: return all data from currently authenticated user

    return { username, avatar };
  } catch (err) {
    console.log(err);

    return err as Error;
  }
};

export const getUsersByPlaceTown = async (args: {
  placeTown: IPlace['address']['town'];
}): Promise<IUser[] | UserPublicData[] | string | Error> => {
  try {
    const { placeTown: town } = args;

    // retrieve the users whose referenced place document match the city's argument passed to the query
    const foundUsers: IUser[] | null = await User.find().populate({
      path: 'places',
      match: { address: { town } },
    });

    if (!foundUsers.length)
      return `No users found with places saved in town '${town}'`;

    const foundUsersPublicData = foundUsers.map(({ username, avatar }) => ({
      username,
      avatar,
    }));

    // TODO: return all data from currently authenticated user

    return foundUsersPublicData;
  } catch (err) {
    console.log(err);

    return err as Error;
  }
};
