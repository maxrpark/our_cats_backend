import { Request } from "express";

export interface TokenPayloadInt {
  user: UserTokenInt;
  refreshToken?: string;
}

export interface UserTokenInt {
  _id: string;
  name: string;
  role: string;
}

export interface RequestUser extends Request {
  user?: UserTokenInt;
}
