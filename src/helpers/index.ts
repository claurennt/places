import { IPlace, IUser } from '../db';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

export const checkDocumentExistence = async <T extends IUser | IPlace>(
  _id: T['_id'],
  collection: Model<T>
): Promise<T | null> => {
  const foundDocument: T | null = await collection.findById(_id);

  return foundDocument;
};

export const hashPassword = async (password) => {
  const hashedPassword = bcrypt.hash(password, 10);
  return hashedPassword;
};

export const placeIconMap = [
  { administrative: 'https://img.icons8.com/dusk/64/administrative-tools.png' },
  { city: 'https://img.icons8.com/dusk/64/city.png' },
  { town: 'https://img.icons8.com/dusk/64/mountain-city.png' },
  { village: 'https://img.icons8.com/dusk/64/neighbor.png' },
  { aerodrome: 'https://img.icons8.com/dusk/64/airport.png' },
  { station: 'https://img.icons8.com/dusk/64/subway.png' },
  { place_of_worship: 'https://img.icons8.com/dusk/64/seed-of-life--v1.png' },
  { pub: 'https://img.icons8.com/dusk/64/beer-bottle.png' },
  { bar: 'https://img.icons8.com/dusk/64/cocktail.png' },
  { university: 'https://img.icons8.com/dusk/64/university.png' },
  { museum: 'https://img.icons8.com/dusk/64/museum.png' },
  { arts_centre: 'https://img.icons8.com/dusk/64/drawing.png' },
  { zoo: 'https://img.icons8.com/dusk/64/panda.png' },
  { theme_park: 'https://img.icons8.com/dusk/64/theme-park.png' },
  { attraction: 'https://img.icons8.com/dusk/64/monument.png' },
  { golf_course: 'https://img.icons8.com/dusk/64/golf-bag.png' },
  { castle: 'https://img.icons8.com/doodle/48/castle.png' },
  { hospital: 'https://img.icons8.com/dusk/64/hospital-2.png' },
  { school: 'https://img.icons8.com/dusk/64/school.png' },
  { theatre: 'https://img.icons8.com/dusk/64/theatre-mask.png' },
  { library: 'https://img.icons8.com/dusk/64/books.png' },
  { fire_station: 'https://img.icons8.com/dusk/64/fire-extinguisher.png' },
  { police: 'https://img.icons8.com/dusk/64/police-badge.png' },
  { bank: 'https://img.icons8.com/dusk/64/bank.png' },
  { post_office: 'https://img.icons8.com/dusk/64/post-office.png' },
  { hotel: 'https://img.icons8.com/dusk/64/3-star-hotel.png' },
  { cinema: 'https://img.icons8.com/dusk/64/film-reel.png' },
  { artwork: 'https://img.icons8.com/dusk/64/edvard-munch--v1.png' },
  { archaeological_site: 'https://img.icons8.com/dusk/64/archeology.png' },
  { doctors: 'https://img.icons8.com/dusk/64/doctors-bag.png' },
  { sports_centre: 'https://img.icons8.com/dusk/64/weightlift.png' },
  { swimming_pool: 'https://img.icons8.com/dusk/64/swimming.png' },
  { supermarket: 'https://img.icons8.com/dusk/64/shopping-cart--v1.png' },
  { convenience: 'https://img.icons8.com/dusk/64/small-business.png' },
  { restaurant: 'https://img.icons8.com/dusk/64/food.png' },
  { fast_food: 'https://img.icons8.com/dusk/64/hamburger.png' },
  { cafe: 'https://img.icons8.com/dusk/64/cafe.png' },
  { guest_house: 'https://img.icons8.com/dusk/64/three-beds.png' },
  { pharmacy: 'https://img.icons8.com/dusk/64/pill.png' },
  { fuel: 'test' },
  { peak: 'test' },
  { wood: 'test' },
  { bicycle: 'test' },
  { clothes: 'test' },
  { hairdresser: 'test' },
  { doityourself: 'test' },
  { estate_agent: 'test' },
  { car: 'test' },
  { garden_centre: 'test' },
  { car_repair: 'test' },
  { bakery: 'test' },
  { butcher: 'test' },
  { apparel: 'test' },
  { laundry: 'test' },
  { beverages: 'test' },
  { alcohol: 'test' },
  { optician: 'test' },
  { chemist: 'test' },
  { gallery: 'test' },
  { jewelry: 'test' },
  { information: 'test' },
  { ruins: 'test' },
  { college: 'test' },
  { monument: 'test' },
  { memorial: 'test' },
  { mine: 'test' },
  { caravan_site: 'test' },
  { bus_station: 'test' },
  { atm: 'test' },
  { viewpoint: 'test' },
  { guesthouse: 'test' },
  { tram: 'test' },
  { courthouse: 'test' },
  { recycling: 'test' },
  { dentist: 'test' },
  { beach: 'test' },
  { tram_stop: 'test' },
  { prison: 'test' },
  { bus_stop: 'test' },
];
