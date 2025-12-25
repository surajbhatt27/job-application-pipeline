import {app} from './app.js'
import { ENV } from './lib/env.js'
import connectDB from './config/db.js'


const PORT = ENV.PORT || 3000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on Port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("MONGODB connection failed", error);
    })