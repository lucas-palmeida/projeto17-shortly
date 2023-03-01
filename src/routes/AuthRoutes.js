import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema, signInSchema } from "../schemas/AuthSchema.js";
import { signUp, signIn } from "../controllers/Auth.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), signUp);
authRouter.post('/signin', validateSchema(signInSchema), signIn);

export default authRouter;