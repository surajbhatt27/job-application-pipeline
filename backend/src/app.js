import express from 'express'
import cors from 'cors'
import { ENV } from './lib/env.js'

const app = express()

app.use(cors({
    origin: ENV.CORS,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// import routes
import applicationRoutes from './routes/application.routes.js'

// Welcome route for base url.
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the InterWeU. The backend is working perfectly!",
    });
});

//Health check route.
app.get('/health', (req, res) => {
    res.status(200).json({
        msg: "Server is up and running"
    })
})

//routes declaration
app.use('/api/v1/user', applicationRoutes)

export {app}