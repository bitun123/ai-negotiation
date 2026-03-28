import { Router } from "express";
import { registerController , loginController } from "../controller/authController.js";
import { registerValidator ,loginValidator } from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validation.middleware.js";

const authRouter = Router();

authRouter.post(
  "/registration",
  registerValidator,
  validateRequest,
  registerController,
);


authRouter.post("/login", loginValidator, validateRequest, loginController);

export default authRouter;
