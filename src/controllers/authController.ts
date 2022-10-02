import { RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthenticated } from "../errors";
import User from "../models/User";
import crypto from "crypto";
import { UserSchemaInt } from "../ts/interfaces";

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

  res.status(StatusCodes.OK).json(user);
};
const logout: RequestHandler = async (req, res) => {
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
