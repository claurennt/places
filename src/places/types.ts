export const placesTypes = `

type Query {
    places:[Place]
    place(_id:String!):Place
}

type Mutation {
    createPlace(input: PlaceInput): Place
    updatePlace(_id:String!, input: PlaceInput): Place
    deletePlace(_id:String!): Place
}
  
type Place {
  _id:String
  name: String
  location: String
  coordinates: [Int]
  color: String
  type: String
  users:[User]
}

input PlaceInput {
  _id:String!
  name: String
  location: String
  coordinates: [Int]
  color: String
  type: String
  users:[UserInput]
}

`;
