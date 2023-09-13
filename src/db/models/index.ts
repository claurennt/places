import { Schema, model, ObjectId } from 'mongoose';

export interface IPlace {
  _id: ObjectId;
  name: string;
  coordinates: number[];
  city: string;
  country: string;
  color: string;
  type: string | string[];
  users: [ObjectId];
}

const placeSchema = new Schema<IPlace>({
  name: String,
  coordinates: {
    type: [Number],
    index: '2d',
    default: [0, 0],
    required: true,
  },
  city: String,
  country: String,
  color: String,
  type: String || [String],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export interface IUser {
  _id: ObjectId;
  username: string;
  email: string;
  password: String;
  avatar: string;
  places: [ObjectId];
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
});

// 3. Create a Model.
export const Place = model<IPlace>('Place', placeSchema);
export const User = model<IUser>('User', userSchema);
