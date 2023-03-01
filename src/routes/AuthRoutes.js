import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { authSchema } from "../schemas/AuthSchema.js";
import { signUp } from "../controllers/Auth.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(authSchema), signUp);

export default authRouter;