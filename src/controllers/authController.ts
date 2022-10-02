import { RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";

const clearDB: RequestHandler = async (req, res) => {
  const db = await User.deleteMany({});
  res.status(StatusCodes.OK).json(db);
};
const register: RequestHandler = async (req, res) => {
  res.json("register");
};
const verifyEmail: RequestHandler = async (req, res) => {
  res.json("verifyEmail");
};
const login: RequestHandler = async (req, res) => {
  res.json("login");
};
const logout: RequestHandler = async (req, res) => {
  res.json("logout");
};
const forgotPassword: RequestHandler = async (req, res) => {
  res.json("forgotPassword");
};
const resetPassword: RequestHandler = async (req, res) => {
  res.json("resetPassword");
};

export {
  clearDB,
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
};
