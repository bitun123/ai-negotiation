import { Router } from "express";
import { registerController } from "../controller/authController.js";


const authRouter = Router();




authRouter.post("/register", registerController);

export default authRouter;