import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthenticated } from "../errors";
import User from "../models/User";

// import crypto from "crypto";
import { UserSchemaInt, RequestUser } from "../ts/interfaces";

// import { attachCookiesToResponse } from "../utils/jwt/jwt";

const getAllUsers = async (req: RequestUser, res: Response) => {
  const users = await User.find({}).select("_id name email role");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

export { getAllUsers };
