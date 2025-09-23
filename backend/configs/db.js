import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_NAME
        })

        console.log("Database connected...");
    } catch (error) {
        console.log("Database connect failed ! :" + error);
    }
}

export default connectDB