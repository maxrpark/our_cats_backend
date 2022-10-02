import app from "./app";
import mongoose from "mongoose";

let PORT = 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        app.listen(PORT, () => {
            console.log(`DB connected and app running on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
