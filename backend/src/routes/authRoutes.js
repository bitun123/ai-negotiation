import { Router } from "express";
import {
  registerController,
  loginController,
} from "../controller/authController.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validation.middleware.js";

const authRouter = Router();

//**
// @routes POST /api/auth/registration
// @desc Register a new user
// @input { userName, email, password }
// */

authRouter.post(
  "/registration",
  registerValidator,
  validateRequest,
  registerController,
);



//** @routes POST /api/auth/login
// @desc Login a user
// @input { email, password }
// */
authRouter.post("/login", loginValidator, validateRequest, loginController);

export default authRouter;
