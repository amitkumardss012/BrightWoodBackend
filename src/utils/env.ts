import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
    dbName: process.env.DATABASE_Name,
    jwtSecret: process.env.JWT_SECRET,

    // Cloudinary Credentials
    cloud_name: process.env.CLOUD_NAME, 
    cloud_api_key: process.env.CLOUD_API_KEY,  
    cloud_api_secret: process.env.CLOUD_API_SECRET,
    cloud_folder: process.env.CLOUD_FOLDER
}