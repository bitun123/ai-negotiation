import express from "express";
import cookie from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

// Importing routes
import authRouter from "./routes/authRoutes.js";
import gameRouter from "./routes/game.routes.js";
// Create an Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

app.use(cookie()); // Middleware to parse cookies
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-negotiation-bnrw.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
); // Middleware to enable CORS

//call the Routes
app.use("/api/auth", authRouter);
app.use("/api/games", gameRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

//export default app
export default app;
