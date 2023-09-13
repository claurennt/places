import { IPlace, IUser, Place, User } from '../db/index.js';

export const createPlace = async (args: {
  _userId: IUser['_id'];
  input: IPlace;
}): Promise<IPlace | Error> => {
  try {
    const { name, coordinates, city, country, color, type, users } = args.input;

    // create new place
    const newPlace: IPlace = new Place({
      name,
      coordinates,
      city,
      country,
      color,
      type,
    });

    // update users field on newly created placewith current user's _id
    const { _userId } = args;

    newPlace.users.push(_userId);

    const user = await User.findById(_userId);

    if (!user) {
      return new Error('User not found');
    }

    // update the User document's places property with the new Place's _id
    user.places.push(newPlace._id);
    await user.save();

    return newPlace;
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
