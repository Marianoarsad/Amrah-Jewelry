import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // MONGO_URI - connection string
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Terminates application if have error 💀
    }
}

export default connectDB;