import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();

import { authRouter } from "./router/index";

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Our cats</h1>");
});

app.use("/api/v1/auth/", authRouter);

export default app;
