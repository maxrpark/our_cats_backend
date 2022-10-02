"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const index_1 = require("./router/index");
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("<h1>Our cats</h1>");
});
app.use("/api/v1/auth/", index_1.authRouter);
exports.default = app;
