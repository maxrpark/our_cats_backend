import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "mongoose";
import { MongoError } from "mongodb";

interface errorInt {
  message: string;
  statusCode: number;
}

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: errorInt = {
    message: error.message || "Something went wrong please try again later",
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (error instanceof Error.ValidationError) {
    customError.message = error.message;
    customError.statusCode = 400;
  } else if (error instanceof Error.CastError) {
    customError.message = `No item found with id : ${error?.value}`;
    customError.statusCode = 404;
  } else if ((error as MongoError).code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      error
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  res
    .status(customError.statusCode)
    .json({ msg: customError.message, statusCode: customError.statusCode });
};

export default errorHandler;
