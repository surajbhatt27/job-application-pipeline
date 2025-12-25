import mongoose from 'mongoose'
import { ENV } from '../lib/env.js'
import { DB_NAME } from './constant.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${ENV.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB connected !! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1);
    }
}

export default connectDB