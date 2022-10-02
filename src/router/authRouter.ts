import { Router } from "express";
import {
  clearDB,
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
const authRouter = Router();

authRouter.route("/clear").get(clearDB);
authRouter.route("/register").post(register);

authRouter.route("/verify-email").post(verifyEmail);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/forgot-password").post(forgotPassword);
authRouter.route("/reset-password").post(resetPassword);

export default authRouter;
