import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

import getAIResponse from "./src/services/ai.service.js";

// Connect to the database
connectDB();



// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
