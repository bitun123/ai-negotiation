import express from "express"
import cookie from "cookie-parser"


// Importing routes
import authRouter from "./routes/authRoutes.js"
import gameRouter from "./routes/game.routes.js"
// Create an Express application
const app = express()
app.use(express.json()) // Middleware to parse JSON bodies

app.use(cookie()) // Middleware to parse cookies

//call the Routes
app.use("/api/auth", authRouter)
app.use("/api/games", gameRouter)

//export default app
export default app