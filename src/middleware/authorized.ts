import { Response, NextFunction } from "express";
import { Unauthenticated } from "../errors";
import { RequestUser } from "../ts/interfaces";
const authorized = (...roles: string[]) => {
  return (req: RequestUser, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      throw new Unauthenticated("Not authorized to visit this route");
    }
    next();
  };
};

export default authorized;
