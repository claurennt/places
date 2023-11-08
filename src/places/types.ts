// in graphql the resolvers' names must match the names in their types definitions
export const placesTypes = `

type Query {
    getPlaces:[Place]
    getPlace(_id:String!):Place
}

type Mutation {
    createPlace(_userId:String!, input: PlaceInput): Place
    updatePlace(_id:String!, input: PlaceInput): Place
    deletePlace(_id:String!): Place
}
  
type Address {
  road: String
  town: String
  county: String
  state: String
  postcode: String
  country: String
}

type Place {
  _id: String
  name: String
  coordinates: [Float]
  address: Address  
  icon: String
  color: String
  type: String
  users: [User]
}


input PlaceInput {
  name: String
  town: String!
  country: String
}

`;
