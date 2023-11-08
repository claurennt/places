import { Schema, model, ObjectId, Document } from 'mongoose';

export interface IPlace extends Document {
  _id: ObjectId;
  name: string;
  coordinates: number[];
  address: {
    road: string;
    town: string;
    county?: string;
    state: string;
    postcode: string;
    country: string;
  };
  icon: String;
  color?: string;
  type?: string | string[];
  users?: [ObjectId];
}

const placeSchema = new Schema<IPlace>({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    index: '2d',
    default: [0, 0],
    required: true,
  },
  address: {
    road: {
      type: String,
    },
    town: {
      type: String,
      required: true,
    },
    county: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
  },
  icon: String,
  color: String,
  type: String || [String],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export interface IUser extends Document {
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
  avatar: { type: String, default: '' },
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
});

// 3. Create a Model.
export const Place = model<IPlace>('Place', placeSchema);
export const User = model<IUser>('User', userSchema);
