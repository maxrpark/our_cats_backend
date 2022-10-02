"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const authorized = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new errors_1.Unauthenticated("Not authorized to visit this route");
        }
        next();
    };
};
exports.default = authorized;
