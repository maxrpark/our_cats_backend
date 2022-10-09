import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../errors";
import Cat from "../models/Cat";
import User from "../models/User";

import { RequestUser, CatInt, UserInt } from "../ts/interfaces";

const showMe = async (req: RequestUser, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const getAllUsers = async (req: RequestUser, res: Response) => {
  const users = await User.find({})
    .select("_id name email role")
    .populate({ path: "catsList", select: "name" });

  res.status(StatusCodes.OK).json({ users, count: users.length });
};
const getSingleUser = async (req: RequestUser, res: Response) => {
  const user = await User.findOne({ _id: req.user?._id })
    .select("_id name email role")
    .populate({ path: "catsList" });

  res.status(StatusCodes.OK).json(user);
};

export { getAllUsers, getSingleUser, showMe };
