"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createToken = (user) => {
    return { _id: user._id, name: user.name, role: user.role };
};
exports.default = createToken;
