import { Place, IPlace, User, IUser } from '../db/index.js';

export const createUser = async (args: {
  input: IUser;
}): Promise<IUser | Error> => {
  try {
    const { username, avatar, password, email, places } = args.input;

    const newUser: IUser = await User.create({
      username,
      avatar,
      password,
      email,
      places,
    });

    return newUser;
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      const [[key, value]] = Object.entries(err.keyValue);

      return new Error(
        `User creation failed: ${key} '${value}' already exists.`
      );
    }
    return err;
  }
};

// export const findAllUsers=

export const deleteUser = async (args: {
  _id: IUser['_id'];
}): Promise<IUser | string | Error> => {
  try {
    const { _id } = args;
    console.log(_id);
    const deletedUser: IUser = await User.findByIdAndDelete(_id);
    console.log(deletedUser);

    if (!deletedUser)
      return `User deletion failed: no user found with _id ${_id}`;

    return deletedUser;
  } catch (err) {
    console.log(err);

    return err;
  }
};
