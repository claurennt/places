import { MongoServerError } from 'mongodb';
import { MongooseError } from 'mongoose';

const isMongoServerError = (
  error: MongoServerError | Error
): error is MongoServerError =>
  error instanceof MongoServerError && error.code === 11000;

const isMongooseError = (
  error: MongooseError | Error
): error is MongooseError => error instanceof MongooseError;

export class ApiError extends Error {
  cause?: Error;

  constructor(error: MongoServerError | Error | MongooseError) {
    let message = 'Something went wrong';

    if (isMongoServerError(error)) {
      const [[key, value]] = Object.entries(error.keyValue);
      message = `Operation failed: ${key} '${value}' already exists.`;
    }

    if (isMongooseError(error)) {
      message = error.message;
    }

    super(message);

    this.cause = error instanceof Error ? error : undefined;
  }
}
