import { Router } from "express";
import { authValidation } from "../middlewares/AuthValidation.js";
import { getRanking, getUser } from "../controllers/Users.js";

const userRouter = Router();

userRouter.get('/ranking', getRanking);
userRouter.get('/users/me', authValidation, getUser);

export default userRouter;