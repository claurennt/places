export const placesTypes = `

type Query {
    places:[Place]
    place(_id:String!):Place
}

type Mutation {
    createPlace(_userId:String!, input: PlaceInput): Place
    updatePlace(_id:String!, input: PlaceInput): Place
    deletePlace(_id:String!): Place
}
  
type Place {
  _id:String
  name: String
  coordinates: [Float]
  city:String
  color: String
  type: String
  users:[User]
}

input PlaceInput {
  name: String
  coordinates: [Float]
  city:String
  country:String
  color: String
  type: String
  users:[UserInput]
}

`;
