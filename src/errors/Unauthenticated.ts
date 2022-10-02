import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";

class Unauthenticated extends CustomError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default Unauthenticated;
