import { Router } from "express";
import {
  loginController,
  logoutController,
  profileController,
  signupController,
} from "../controllers/users.controller";
import { loginSchema, signupSchema } from "../validators/user.validator";
import { validateSchema } from "../../../middlewares/validate";
import { verifyJWT } from "../../../middlewares/verifyUser";

const usersRouter = Router();

usersRouter
  .route("/signup")
  .post(validateSchema(signupSchema), signupController);

usersRouter.route("/login").post(validateSchema(loginSchema), loginController);

usersRouter.route("/me").get(verifyJWT, profileController);

usersRouter.route("/logout").get(verifyJWT, logoutController);

export { usersRouter };
