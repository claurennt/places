export const usersTypes = `

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
