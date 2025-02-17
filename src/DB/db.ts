import mongoose from "mongoose"
import { env } from "../utils/env";
export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(env.dbUrl!,{dbName: env.dbName});
        console.log(`MongoDB connected To: ${connection.connection.host}`);
    } catch (error) {
        console.log("failed to connect to Database", error);
        process.exit(1);
    }
}