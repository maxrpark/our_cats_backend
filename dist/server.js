"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let PORT = 5000;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        app_1.default.listen(PORT, () => {
            console.log(`DB connected and app running on port: ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
