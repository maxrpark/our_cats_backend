"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const errorHandler = (error, req, res, next) => {
    let customError = {
        message: error.message || "Something went wrong please try again later",
        statusCode: error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    };
    if (error instanceof mongoose_1.Error.ValidationError) {
        customError.message = error.message;
        customError.statusCode = 400;
    }
    else if (error instanceof mongoose_1.Error.CastError) {
        customError.message = `No item found with id : ${error === null || error === void 0 ? void 0 : error.value}`;
        customError.statusCode = 404;
    }
    else if (error.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(error)} field, please choose another value`;
        customError.statusCode = 400;
    }
    res
        .status(customError.statusCode)
        .json({ msg: customError.message, statusCode: customError.statusCode });
};
exports.default = errorHandler;
