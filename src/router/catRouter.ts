import { Router } from "express";
import {
  removeAllDocuments,
  getAllCats,
  createCat,
  getSingleCat,
  toggleCatList,
} from "../controllers/catController";
import { authenticated } from "../middleware";

const catRouter = Router();

catRouter.route("/clear").get(removeAllDocuments);

catRouter.route("/").get(getAllCats);
catRouter.route("/").post(createCat);
catRouter.route("/:id").get(getSingleCat);
catRouter.route("/toggle/:id").post(authenticated, toggleCatList);

export default catRouter;
