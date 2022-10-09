"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CatSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
        minlength: 4,
        maxlength: 12,
    },
});
const Cat = (0, mongoose_1.model)("Cat", CatSchema);
exports.default = Cat;
