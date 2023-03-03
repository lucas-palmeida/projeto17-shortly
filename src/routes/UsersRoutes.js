import { Router } from "express";
import { authValidation } from "../middlewares/AuthValidation.js";
import { getRanking, getUser } from "../controllers/Users.js";

const userRouter = Router();

userRouter.get('/ranking', getRanking);
userRouter.use(authValidation);
userRouter.get('/users/me', getUser);

export default userRouter;