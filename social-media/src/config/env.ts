import {z} from "zod";
import  dotenv  from "dotenv";

dotenv.config();




const envSchema=z.object({
    NODE_ENV:z.enum(["production","development","test"]).default("development"),
    PORT:z.string().transform(Number).default('8000'),
    // database 
    DATABASE_URL:z.string().url(),
    // jwt 
    JWT_SECRET:z.string().min(32,'JWT SECRET MUST BE AT LEAST 32 CHAR'),
    JWT_EXPIRE:z.string(),
    //file upload

    CLOUDINARY_CLOUD_NAME:z.string().optional(),
    CLOUDINARY_API_KEY:z.string().optional(),
    CLOUDINARY_API_SECRET:z.string().optional(),

    CORS_ORIGIN:z.string().default("http://localhost:3000")


})


export const env=envSchema.parse(process.env);

