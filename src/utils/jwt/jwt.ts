import { Response } from "express";
import { UserTokenInt, TokenPayloadInt } from "../../ts/interfaces/";
import jwt from "jsonwebtoken";

interface Params {
  res: Response;
  user: UserTokenInt;
  refreshToken: string;
}

const createJWT = (payload: TokenPayloadInt) => {
  return jwt.sign(payload, process.env.JWT_SECRET!);
};

export const verifyToken = (payload: string) => {
  return jwt.verify(payload, process.env.JWT_SECRET!);
};

export const attachCookiesToResponse = ({
  res,
  user,
  refreshToken,
}: Params) => {
  const accessJWT = createJWT({ user, refreshToken });
  const refreshJWT = createJWT({ user, refreshToken });

  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = oneDay * 30;

  res.cookie("accessToken", accessJWT, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie("refreshToken", refreshJWT, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneMonth),
  });
};
