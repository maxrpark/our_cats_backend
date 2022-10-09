import { Router } from "express";

import {
  getAllUsers,
  getSingleUser,
  showMe,
} from "../controllers/userController";
import { authenticated, authorized } from "../middleware";

const userRouter = Router();

userRouter.route("/").get([authenticated, authorized("admin")], getAllUsers);
userRouter.route("/user").get(authenticated, getSingleUser);
userRouter.route("/me").get(authenticated, showMe);

export default userRouter;
