import { IPlace, IUser, Place, User } from '../db';
import { Model } from 'mongoose';

export const checkDocumentExistence = async <T extends IUser | IPlace>(
  _id: T['_id'],
  collection: Model<T>
): Promise<T | null> => {
  const foundDocument: T | null = await collection.findById(_id);

  return foundDocument;
};
