import { User, IUser } from '../db';
import { hashPassword, ApiError } from '../helpers';

export const createUser = async (args: {
  data: Omit<IUser, 'places'>;
}): Promise<Partial<IUser> | Error | undefined> => {
  try {
    const {
      data: { username, avatar, password, email },
    } = args;

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
    if (error instanceof Error) {
      throw new ApiError(error);
    }
  }
};

export const deleteUser = async (args: {
  _id: IUser['_id'];
}): Promise<Partial<IUser> | Error | undefined> => {
  try {
    const { _id } = args;

    const deletedUser = await User.findByIdAndDelete(_id);

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
    if (error instanceof Error) {
      throw new ApiError(error);
    }
  }
};

export const updateUser = async (args: {
  _id: IUser['_id'];
  data: Partial<IUser>;
}) => {
  try {
    const { _id, data } = args;

    const updatedUser = await User.findByIdAndUpdate(_id, data);

    if (!updatedUser) {
      return new Error(`User update failed: no user found with _id ${_id}`);
    }
    const { username, avatar, email } = updatedUser;

    return {
      username,
      avatar,
      email,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error);
    }
  }
};
