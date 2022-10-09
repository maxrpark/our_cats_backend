import { Router } from "express";

import { getAllUsers, toggleCatList } from "../controllers/userController";
import { authenticated, authorized } from "../middleware";

const userRouter = Router();

userRouter.route("/").get([authenticated, authorized("admin")], getAllUsers);
userRouter.route("/cats/:id").post(authenticated, toggleCatList);

export default userRouter;
