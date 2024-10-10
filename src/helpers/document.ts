import { Model, ObjectId } from 'mongoose';

export const checkDocumentExistence = async <T extends { _id: ObjectId }>(
  _id: T['_id'],
  collection: Model<T>
): Promise<T | null> => {
  const foundDocument = await collection.findById(_id);

  return foundDocument;
};
