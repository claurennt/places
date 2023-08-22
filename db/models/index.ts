import { Schema, model, ObjectId } from 'mongoose';

export interface IPlace {
  name: string;
  location: string;
  coordinates: number[];
  color: string;
  type: string | string[];
  users: [ObjectId];
}

const placeSchema = new Schema<IPlace>({
  name: String,
  location: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  color: String,
  type: String || [String],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export interface IUser {
  username: string;
  email: string;
  password: String;
  avatar: string;
  places: [ObjectId];
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
});

// 3. Create a Model.
export const Place = model<IPlace>('Place', placeSchema);
export const User = model<IUser>('User', userSchema);
