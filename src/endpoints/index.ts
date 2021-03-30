import { Router } from "express";
import stryktipsetRouter from "./stryktipset";

const apiRouter = Router();

apiRouter.use("/stryktipset", stryktipsetRouter);

export default apiRouter;
