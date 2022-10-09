"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCatList = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const Cat_1 = __importDefault(require("../models/Cat"));
const User_1 = __importDefault(require("../models/User"));
// import { attachCookiesToResponse } from "../utils/jwt/jwt";
const getAllUsers = async (req, res) => {
    const users = await User_1.default.find({}).select("_id name email role cats");
    res.status(http_status_codes_1.StatusCodes.OK).json({ users, count: users.length });
};
exports.getAllUsers = getAllUsers;
const toggleCatList = async (req, res) => {
    var _a;
    const { id } = req.params;
    if (!id) {
        throw new errors_1.BadRequest("Please provide all values");
    }
    const cat = await Cat_1.default.findOne({ _id: id });
    if (!cat) {
        throw new errors_1.BadRequest(`No cat with id ${id}`);
    }
    let user = null;
    const isCatOnList = await User_1.default.findOne({
        _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        cats: { $in: id },
    });
    if (!isCatOnList) {
        user = await User_1.default.findOneAndUpdate({
            _id: req.user._id,
        }, { $push: { cats: cat === null || cat === void 0 ? void 0 : cat._id } }, { runValidators: true, new: true });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "added", cat });
    }
    user = await User_1.default.findOneAndUpdate({
        _id: req.user._id,
    }, { $pull: { cats: cat === null || cat === void 0 ? void 0 : cat._id } }, { runValidators: true, new: true });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "remove from list" });
};
exports.toggleCatList = toggleCatList;
