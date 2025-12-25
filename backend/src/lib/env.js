import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    CORS: process.env.CORS
}