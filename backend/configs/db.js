import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {

        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            console.error("Missing MONGO_URL in environment !!!!");
            process.exit(1);
        }


        await mongoose.connect(MONGODB_URI)
        console.log("Database connected...");
    } catch (error) {
        console.log("Database connect failed ! :" + error);
    }
}

export default connectDB