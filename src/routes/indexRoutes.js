import { Router } from "express";
import authRouter from "./AuthRoutes.js";

const router = Router();

router.use(authRouter);

export default router;