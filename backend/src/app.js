import express from "express"



// Importing routes
import authRouter from "./routes/authRoutes.js"

// Create an Express application
const app = express()


//call the Routes
app.use("/api/auth", authRouter)


//export default app
export default app