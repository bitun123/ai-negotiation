import { Router } from "express";
import { registerController } from "../controller/authController.js";
import { registerValidator } from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validation.middleware.js";

const authRouter = Router();

authRouter.post(
  "/registration",
  registerValidator,
  validateRequest,
  registerController,
);


authRouter.post("/login",)

export default authRouter;
