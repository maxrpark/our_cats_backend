import { Router } from "express";

import { getAllUsers } from "../controllers/userController";
import { authenticated, authorized } from "../middleware";

const userRouter = Router();

userRouter.route("/").get([authenticated, authorized("admin")], getAllUsers);

export default userRouter;
