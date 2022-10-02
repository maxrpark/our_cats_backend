"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
};
const verifyToken = (payload) => {
    return jsonwebtoken_1.default.verify(payload, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
const attachCookiesToResponse = ({ res, user, refreshToken, }) => {
    const accessJWT = createJWT({ user, refreshToken });
    const refreshJWT = createJWT({ user, refreshToken });
    const oneDay = 1000 * 60 * 60 * 24;
    const oneMonth = oneDay * 30;
    res.cookie("accessToken", accessJWT, {
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + oneDay),
    });
    res.cookie("refreshToken", refreshJWT, {
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + oneMonth),
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;
