import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import "express-async-errors";

import { notFound, errorHandler } from "./middleware";
import { authRouter, userRouter } from "./router/index";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Our cats</h1>");
});

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users/", userRouter);

app.use(errorHandler);
app.use(notFound);

export default app;
