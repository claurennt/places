export const usersTypes = `

type Query {
  getUsers:[User]
  getUser(_id:String!):User
}

type Mutation {
  createUser(input: UserInput): User
  updateUserData(_id:String!, input: UserInput): User
  addPlaceToUser(_id:String!, placeId: UserInput): User
  deleteUser(_id:String!): User
}

type User {
  _id:String
  username: String
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
