import { RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthenticated } from "../errors";
import User from "../models/User";
import Token from "../models/Token";
import crypto from "crypto";
import { UserSchemaInt, TokenInt, RequestUser } from "../ts/interfaces";
import { createToken } from "../utils/jwt";
import { attachCookiesToResponse } from "../utils/jwt/jwt";

const clearDB: RequestHandler = async (req, res) => {
  const db = await User.deleteMany({});
  res.status(StatusCodes.OK).json(db);
};
const register: RequestHandler = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequest("Please provide all values");
  }
  let user = await User.findOne({
    $or: [
      {
        email,
      },
      {
        name,
      },
    ],
  });

  if (user) {
    throw new BadRequest("User already exist");
  }

  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");

  user = await User.create({ email, name, password, role, verificationToken });

  res.status(StatusCodes.CREATED).json(user);
};
const verifyEmail: RequestHandler = async (req, res) => {
  res.json("verifyEmail");
};
const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide all values");
  }
  const user: UserSchemaInt | null = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("Email or password incorrect");
  }

  // if (!user?.isVerified) {
  //   throw new BadRequest("Please verify your email");
  // }

  let isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    throw new BadRequest("password incorrect");
  }

  const userToken = createToken(user);
  let refreshToken = "";

  const existingToken: TokenInt | null = await Token.findOne({
    user: user?._id,
  });

  if (existingToken) {
    if (!existingToken.isValid) {
      throw new Unauthenticated("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: userToken, refreshToken });
    return res.status(StatusCodes.OK).json(userToken);
  }

  let userAgent = req.headers["user-agent"];
  let ip = req.ip;
  refreshToken = crypto.randomBytes(40).toString("hex");

  const newToken = {
    userAgent,
    refreshToken,
    ip,
    user,
  };

  await Token.create(newToken);
  attachCookiesToResponse({ res, user: userToken, refreshToken });
  res.status(StatusCodes.OK).json(userToken);
};
const logout = async (req: RequestUser, res: Response) => {
  res.json("logout");
};
const forgotPassword: RequestHandler = async (req, res) => {
  res.json("forgotPassword");
};
const resetPassword: RequestHandler = async (req, res) => {
  res.json("resetPassword");
};

export {
  clearDB,
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
};
