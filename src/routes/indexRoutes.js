import { Router } from "express";
import authRouter from "./AuthRoutes.js";
import urlRouter from "./UrlRoutes.js";

const router = Router();

router.use(authRouter);
router.use(urlRouter);

export default router;