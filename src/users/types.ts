// in graphql the resolvers' names must match the names in their types definitions
export const usersTypes = `

type Query {
  getUsers:[User]
  getUser(_id:String!):User
  getUsersByPlaceTown(placeTown:String!):[User]
}

type Mutation {
  createUser(data: UserInput):User
  updateUser(_id:String!, data: UserInput):User
  addPlaceToUser(_id:String!, placeId: UserInput):User
  deleteUser(_id:String!): User
}

type User {
  _id:String
  username: String
  email: String
  password: String
  avatar:String
  places:[Place]
}

input UserInput {
  _id:String
  username: String
  email: String
  password: String
  avatar:String
  places:[PlaceInput]
}

`;
