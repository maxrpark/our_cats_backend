"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logout = exports.verifyEmail = exports.login = exports.register = exports.clearDB = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const clearDB = async (req, res) => {
    const db = await User_1.default.deleteMany({});
    res.status(http_status_codes_1.StatusCodes.OK).json(db);
};
exports.clearDB = clearDB;
const register = async (req, res) => {
    res.json("register");
};
exports.register = register;
const verifyEmail = async (req, res) => {
    res.json("verifyEmail");
};
exports.verifyEmail = verifyEmail;
const login = async (req, res) => {
    res.json("login");
};
exports.login = login;
const logout = async (req, res) => {
    res.json("logout");
};
exports.logout = logout;
const forgotPassword = async (req, res) => {
    res.json("forgotPassword");
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    res.json("resetPassword");
};
exports.resetPassword = resetPassword;
