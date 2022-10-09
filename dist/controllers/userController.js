"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMe = exports.getSingleUser = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const showMe = async (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
};
exports.showMe = showMe;
const getAllUsers = async (req, res) => {
    const users = await User_1.default.find({})
        .select("_id name email role")
        .populate({ path: "catsList", select: "name" });
    res.status(http_status_codes_1.StatusCodes.OK).json({ users, count: users.length });
};
exports.getAllUsers = getAllUsers;
const getSingleUser = async (req, res) => {
    var _a;
    const user = await User_1.default.findOne({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id })
        .select("_id name email role")
        .populate({ path: "catsList" });
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
};
exports.getSingleUser = getSingleUser;
