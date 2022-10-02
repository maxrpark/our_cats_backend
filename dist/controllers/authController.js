"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logout = exports.verifyEmail = exports.login = exports.register = exports.clearDB = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const User_1 = __importDefault(require("../models/User"));
const Token_1 = __importDefault(require("../models/Token"));
const crypto_1 = __importDefault(require("crypto"));
const jwt_1 = require("../utils/jwt");
const jwt_2 = require("../utils/jwt/jwt");
const clearDB = async (req, res) => {
    const db = await User_1.default.deleteMany({});
    res.status(http_status_codes_1.StatusCodes.OK).json(db);
};
exports.clearDB = clearDB;
const register = async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        throw new errors_1.BadRequest("Please provide all values");
    }
    let user = await User_1.default.findOne({
        $or: [
            {
                email,
            },
            {
                name,
            },
        ],
    });
    if (user) {
        throw new errors_1.BadRequest("User already exist");
    }
    const role = (await User_1.default.countDocuments({})) === 0 ? "admin" : "user";
    const verificationToken = crypto_1.default.randomBytes(40).toString("hex");
    user = await User_1.default.create({ email, name, password, role, verificationToken });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(user);
};
exports.register = register;
const verifyEmail = async (req, res) => {
    res.json("verifyEmail");
};
exports.verifyEmail = verifyEmail;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequest("Please provide all values");
    }
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.BadRequest("Email or password incorrect");
    }
    // if (!user?.isVerified) {
    //   throw new BadRequest("Please verify your email");
    // }
    let isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
        throw new errors_1.BadRequest("password incorrect");
    }
    const userToken = (0, jwt_1.createToken)(user);
    let refreshToken = "";
    const existingToken = await Token_1.default.findOne({
        user: user === null || user === void 0 ? void 0 : user._id,
    });
    if (existingToken) {
        if (!existingToken.isValid) {
            throw new errors_1.Unauthenticated("Invalid Credentials");
        }
        refreshToken = existingToken.refreshToken;
        (0, jwt_2.attachCookiesToResponse)({ res, user: userToken, refreshToken });
        return res.status(http_status_codes_1.StatusCodes.OK).json(userToken);
    }
    let userAgent = req.headers["user-agent"];
    let ip = req.ip;
    refreshToken = crypto_1.default.randomBytes(40).toString("hex");
    const newToken = {
        userAgent,
        refreshToken,
        ip,
        user,
    };
    await Token_1.default.create(newToken);
    (0, jwt_2.attachCookiesToResponse)({ res, user: userToken, refreshToken });
    res.status(http_status_codes_1.StatusCodes.OK).json(userToken);
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
