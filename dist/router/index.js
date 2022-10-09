"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catRouter = exports.userRouter = exports.authRouter = void 0;
const authRouter_1 = __importDefault(require("./authRouter"));
exports.authRouter = authRouter_1.default;
const catRouter_1 = __importDefault(require("./catRouter"));
exports.catRouter = catRouter_1.default;
const userRouter_1 = __importDefault(require("./userRouter"));
exports.userRouter = userRouter_1.default;
