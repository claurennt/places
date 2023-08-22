import { buildSchema } from 'graphql';

export const schema = buildSchema(`
type Query {
  users:[User]
  places:[Place]
  user(id:Int!):User
  place(id:Int!):Place
}

type Mutation {
  createUser(input: UserInput): User
  updateUser(id: ID!, input: UserInput): User
  createPlace(input: PlaceInput): Place
  updatePlace(id: ID!, input: PlaceInput): Place
}

type Place {
  id:String
  name: String
  location: String
  coordinates: [Int]
  color: String
  type: String
  users:[User]
}

input PlaceInput {
  id:String
  name: String
  location: String
  coordinates: [Int]
  color: String
  type: String
  users:[UserInput]
}

type User {
  id:String
  username: String
  email: String
  password: String
  avatar:String
  places:[Place]
}

input UserInput {
  id:String
  username: String
  email: String
  password: String
  avatar:String
  places:[PlaceInput]
}

`);
