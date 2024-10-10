import { MongoServerError } from 'mongodb';

const isMongoServerError = (
  error: MongoServerError | Error
): error is MongoServerError =>
  error instanceof MongoServerError &&
  error.name === 'MongoServerError' &&
  error.code === 11000;

export class ApiError extends Error {
  cause?: Error;

  constructor(error: MongoServerError | Error) {
    let message = 'Something went wrong';

    if (isMongoServerError(error)) {
      const [[key, value]] = Object.entries(error.keyValue);
      message = `Operation failed: ${key} '${value}' already exists.`;
    }

    super(message);

    this.cause = error instanceof Error ? error : undefined;
  }
}
