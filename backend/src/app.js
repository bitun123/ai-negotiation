import express from "express";
import cookie from "cookie-parser";
import cors from "cors";

// Importing routes
import authRouter from "./routes/authRoutes.js";
import gameRouter from "./routes/game.routes.js";
// Create an Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use(cookie()); // Middleware to parse cookies
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
); // Middleware to enable CORS

//call the Routes
app.use("/api/auth", authRouter);
app.use("/api/games", gameRouter);

//export default app
export default app;
