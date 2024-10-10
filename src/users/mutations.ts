import { User, IUser } from '@db';
import { hashPassword, ApiError } from '@helpers';

export const createUser = async (args: {
  input: Omit<IUser, 'places'>;
}): Promise<Partial<IUser> | Error> => {
  try {
    const { username, avatar, password, email } = args.input;

    const hashedPassword = await hashPassword(password);

    await User.create({
      username,
      avatar,
      password: hashedPassword,
      email,
    });

    return {
      username,
      avatar,
      email,
    };
  } catch (error) {
    throw new ApiError(error);
  }
};

export const deleteUser = async (args: {
  _id: IUser['_id'];
}): Promise<Partial<IUser> | Error> => {
  try {
    const { _id } = args;

    const deletedUser: IUser | null = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return new Error(`User deletion failed: no user found with _id ${_id}`);
    }
    const { username, avatar, email } = deletedUser;

    return {
      username,
      avatar,
      email,
    };
  } catch (error) {
    throw new ApiError(error);
  }
};

// TODO: updateUser resolver
