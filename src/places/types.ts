// in graphql the resolvers' names must match the names in their types definitions
export const placesTypes = `

type Query {
    getPlacesByFilter(town:String,country:String):[Place]
    getPlaceById(_id:String!):Place
}

type Mutation {
    createPlace(_userId:String!, data: PlaceInput): Place
    updatePlace(_id:String!, data: PlaceInput): Place
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

type Address = {
  city: string;
  state_district: string;
  state: string;
  ISO3166_2_lvl4: string;
  postcode: string;
  country: string;
  country_code: string;
};

type ExtraTags = {
  capital: string;
  website: string;
  wikidata: string;
  wikipedia: string;
  population: string;
};

export type ApiPlaceResponse = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
  address: Address;
  extratags: ExtraTags;
};
