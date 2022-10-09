"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const middleware_1 = require("../middleware");
const userRouter = (0, express_1.Router)();
userRouter.route("/").get([middleware_1.authenticated, (0, middleware_1.authorized)("admin")], userController_1.getAllUsers);
userRouter.route("/cats/:id").post(middleware_1.authenticated, userController_1.toggleCatList);
exports.default = userRouter;
