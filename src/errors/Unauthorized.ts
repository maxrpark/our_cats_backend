import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";

class Unauthorized extends CustomError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default Unauthorized;
