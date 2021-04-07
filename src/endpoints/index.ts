import { Router } from "express";
import stryktipsetRouter from "./stryktips";
import netRouter from "./nets";

const apiRouter = Router();

apiRouter.use("/stryktips", stryktipsetRouter);
apiRouter.use("/nets", netRouter);

export default apiRouter;
