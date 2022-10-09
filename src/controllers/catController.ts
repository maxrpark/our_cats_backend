import { Response, RequestHandler } from "express";
import { CatInt, RequestUser } from "../ts/interfaces";
import { StatusCodes } from "http-status-codes";
import Cat from "../models/Cat";
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
  const { name } = req.body;
  if (!name) {
    throw new BadRequest("Please provide all values");
  }
  const cat: CatInt = await Cat.create({ name });
  res.status(StatusCodes.OK).json(cat);
};
const getSingleCat = async (req: RequestUser, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("Please provide all values");
  }
  const cat: CatInt | null = await Cat.findOne({ _id: id });

  if (!cat) {
    throw new BadRequest(`No cat with id ${req.params.id}`); // TODO Change not found
  }

  res.status(StatusCodes.OK).json(cat);
};

export { removeAllDocuments, getAllCats, createCat, getSingleCat };
