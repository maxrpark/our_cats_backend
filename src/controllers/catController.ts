import { Response, RequestHandler } from "express";
import { CatInt, RequestUser, UserSchemaInt } from "../ts/interfaces";
import { StatusCodes } from "http-status-codes";
import Cat from "../models/Cat";
import User from "../models/User";
import { BadRequest } from "../errors";

const removeAllDocuments: RequestHandler = async (req, res) => {
  const db = await Cat.deleteMany({});
  res.status(StatusCodes.OK).json(db);
};

const getAllCats = async (req: RequestUser, res: Response) => {
  const cats: CatInt[] | [] = await Cat.find({});
  res.status(StatusCodes.OK).json({ cats, count: cats.length });
};

const createCat = async (req: RequestUser, res: Response) => {
  const { name, human } = req.body;
  if (!name || !human) {
    throw new BadRequest("Please provide all values");
  }
  const cat: CatInt = await Cat.create({ name, human });
  res.status(StatusCodes.OK).json(cat);
};

const getSingleCat = async (req: RequestUser, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("Please provide all values");
  }
  const cat: CatInt | null = await Cat.findOne({ _id: id }).populate({
    path: "human",
    select: "name",
  });

  if (!cat) {
    throw new BadRequest(`No cat with id ${req.params.id}`); // TODO Change not found
  }

  res.status(StatusCodes.OK).json(cat);
};

const toggleCatList = async (req: RequestUser, res: Response) => {
  const { id } = req.params;
  let cat: CatInt | null = await Cat.findOne({ _id: id });

  if (!cat) {
    throw new BadRequest(`No cat with id ${id}`);
  }

  const isCatOnList = await Cat.findOne({
    _id: id,
    human: { $in: req.user?._id },
  });

  if (!isCatOnList) {
    cat = await Cat.findOneAndUpdate(
      {
        _id: id,
      },
      { $push: { human: req.user?._id } },
      { runValidators: true, new: true }
    );
    return res.status(StatusCodes.OK).json({ msg: "added", cat });
  }
  cat = await Cat.findOneAndUpdate(
    {
      _id: id,
    },
    { $pull: { human: req.user?._id } },
    { runValidators: true, new: true }
  );

  res.status(StatusCodes.OK).json({ msg: "remove from list" });
};

export {
  removeAllDocuments,
  getAllCats,
  createCat,
  getSingleCat,
  toggleCatList,
};
