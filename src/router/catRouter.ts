import { Router } from "express";
import {
  removeAllDocuments,
  getAllCats,
  createCat,
  getSingleCat,
} from "../controllers/catController";

const catRouter = Router();

catRouter.route("/clear").get(removeAllDocuments);

catRouter.route("/").get(getAllCats);
catRouter.route("/").post(createCat);
catRouter.route("/:id").get(getSingleCat);

export default catRouter;
