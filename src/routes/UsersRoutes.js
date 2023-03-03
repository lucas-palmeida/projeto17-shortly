import { Router } from "express";
import { getUser } from "../controllers/Users.js";
import { authValidation } from "../middlewares/AuthValidation.js";

const userRouter = Router();

userRouter.use(authValidation);
userRouter.get('/users/me', getUser);

export default userRouter;