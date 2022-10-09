import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthenticated } from "../errors";
import Cat from "../models/Cat";
import User from "../models/User";

// import crypto from "crypto";
import { UserSchemaInt, RequestUser, CatInt, UserInt } from "../ts/interfaces";

// import { attachCookiesToResponse } from "../utils/jwt/jwt";

const getAllUsers = async (req: RequestUser, res: Response) => {
  const users = await User.find({}).select("_id name email role cats");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const toggleCatList = async (req: RequestUser, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("Please provide all values");
  }
  const cat: CatInt | null = await Cat.findOne({ _id: id });

  if (!cat) {
    throw new BadRequest(`No cat with id ${id}`);
  }

  let user: UserInt | null = null;

  const isCatOnList = await User.findOne({
    _id: req.user?._id,
    cats: { $in: id },
  });
  if (!isCatOnList) {
    user = await User.findOneAndUpdate(
      {
        _id: req.user!._id,
      },
      { $push: { cats: cat?._id } },
      { runValidators: true, new: true }
    );
    return res.status(StatusCodes.OK).json({ msg: "added", cat });
  }
  user = await User.findOneAndUpdate(
    {
      _id: req.user!._id,
    },
    { $pull: { cats: cat?._id } },
    { runValidators: true, new: true }
  );

  res.status(StatusCodes.OK).json({ msg: "remove from list" });
};

export { getAllUsers, toggleCatList };
