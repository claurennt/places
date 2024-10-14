import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from "url"

export type FetchPlaceResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;

  address: {
    amenity: string;
    road: string;
    hamlet: string;
    town: string;
    county: string;
    'ISO3166-2-lvl6': string;
    state: string;
    'ISO3166-2-lvl4': string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
};

const encodeParameter = (urlParameter: string = '') =>
  encodeURIComponent(urlParameter);

// Function to fetch place details with better URL handling
export const fetchPlaceDetails = async (
  name?: string,
  city?: string,
  country?: string
) => {
  const params = new URLSearchParams({
    query: [name, city, country].filter(Boolean).join(' '),
    addressdetails: '1',
    format: 'jsonv2',
    limit: '20',
  });

  try {
    const { data: placeData }: AxiosResponse<FetchPlaceResponse[]> =
      await axios.get(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`
      );

    return placeData;
  } catch (error) {
    // Handle errors such as network failures
    console.error('Error fetching place details:', error);
    throw new Error('Failed to fetch place details.');
  }
};
