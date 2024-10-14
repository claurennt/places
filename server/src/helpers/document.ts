import mongoose, { Model, ObjectId } from 'mongoose';

type PlaceFilter = { town?: string; country?: string };

export const checkDocumentExistence = async <
  T extends { _id?: ObjectId; town?: string; country?: string }
>(
  filter: T['_id'] | PlaceFilter,
  collection: Model<T>
): Promise<T | null | T[]> => {
  let foundDocuments: T | T[] | null = null;

  if (filter instanceof mongoose.Types.ObjectId) {
    foundDocuments = await collection.findById(filter);
  }
  if (filter instanceof Object) {
    foundDocuments = await collection.find(filter);
  }

  return foundDocuments;
};
