"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = __importDefault(require("../models/Token"));
const errors_1 = require("../errors");
const jwt_1 = require("../utils/jwt");
const jwt_2 = require("../utils/jwt/jwt");
const authenticated = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies;
    try {
        if (accessToken) {
            const payload = (0, jwt_1.verifyToken)(accessToken);
            req.user = payload.user;
            return next();
        }
        const payload = (0, jwt_1.verifyToken)(refreshToken);
        const existingToken = await Token_1.default.findOne({
            user: payload.user._id,
            refreshToken: payload.refreshToken,
        });
        if (!existingToken) {
            throw new errors_1.Unauthenticated("Invalid Credentials");
        }
        (0, jwt_2.attachCookiesToResponse)({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw new errors_1.Unauthenticated("Invalid Credentials");
    }
};
exports.default = authenticated;
