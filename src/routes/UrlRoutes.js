import { Router } from "express";
import { authValidation } from "../middlewares/AuthValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/UrlSchema.js";
import { insertUrl, getUrlById, openUrl, deleteUrl } from "../controllers/Urls.js";

const urlRouter = Router();

urlRouter.get('/urls/:id', getUrlById);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.post('/urls/shorten', authValidation, validateSchema(urlSchema), insertUrl);
urlRouter.delete('/urls/:id', authValidation, deleteUrl);

export default urlRouter;