import { Router } from "express";
import stryktipsetRouter from "./stryktipset";
import netRouter from "./net";

const apiRouter = Router();

apiRouter.use("/stryktipset", stryktipsetRouter);
apiRouter.use("/net", netRouter);

export default apiRouter;
