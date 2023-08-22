import mongoose from 'mongoose';
import sanitizedConfig from '../../config.js';

mongoose
  .connect(sanitizedConfig.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Connection to the database successful'))
  .catch((err) => {
    console.log('ERROR! Connection to the database failed', err);
  });

const db = mongoose.connection;

db.on('error', (error: Error) => console.log(error.message));

export default db;
