import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";

const signUpRouter = Router();

signUpRouter.post('/signup', validateSchema(signUpSchema), registerUser);

export default signUpRouter;