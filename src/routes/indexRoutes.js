import { Router } from "express";
import authRouter from "./AuthRoutes.js";
import urlRouter from "./UrlRoutes.js";
import userRouter from "./UsersRoutes.js";

const router = Router();

router.use(authRouter);
router.use(urlRouter);
router.use(userRouter);

export default router;