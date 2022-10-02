"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const middleware_1 = require("./middleware");
const index_1 = require("./router/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("<h1>Our cats</h1>");
});
app.use("/api/v1/auth/", index_1.authRouter);
app.use(middleware_1.errorHandler);
app.use(middleware_1.notFound);
exports.default = app;
