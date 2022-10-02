import { Response, NextFunction } from "express";
import Token from "../models/Token";
import { Unauthenticated } from "../errors";
import { verifyToken } from "../utils/jwt";
import { RequestUser, TokenInt } from "../ts/interfaces";
import { JwtPayload } from "jsonwebtoken";
import { attachCookiesToResponse } from "../utils/jwt/jwt";

const authenticated = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = verifyToken(accessToken);
      req.user = (payload as JwtPayload).user;
      return next();
    }

    const payload = verifyToken(refreshToken);

    const existingToken: TokenInt | null = await Token.findOne({
      user: (payload as JwtPayload).user._id,
      refreshToken: (payload as JwtPayload).refreshToken,
    });

    if (!existingToken) {
      throw new Unauthenticated("Invalid Credentials");
    }

    attachCookiesToResponse({
      res,
      user: (payload as JwtPayload).user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = (payload as JwtPayload).user;
    next();
  } catch (error) {
    throw new Unauthenticated("Invalid Credentials");
  }
};

export default authenticated;
