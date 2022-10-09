"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 3,
        maxlength: 12,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 5,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
    },
    verificationToken: {
        type: String,
        required: [true, "Name is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
    // cats: [{ type: Types.ObjectId, ref: "Cat", unique: true }],
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
UserSchema.pre("save", async function () {
    if (!this.isDirectModified("password"))
        return;
    let salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    let isMatch = await bcryptjs_1.default.compare(candidatePassword, this.password);
    return isMatch;
};
UserSchema.virtual("catsList", {
    ref: "Cat",
    localField: "_id",
    foreignField: "human",
    justOne: false,
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
