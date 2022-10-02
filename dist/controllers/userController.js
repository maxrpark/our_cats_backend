"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
// import { attachCookiesToResponse } from "../utils/jwt/jwt";
const getAllUsers = async (req, res) => {
    const users = await User_1.default.find({}).select("_id name email role");
    res.status(http_status_codes_1.StatusCodes.OK).json({ users, count: users.length });
};
exports.getAllUsers = getAllUsers;
