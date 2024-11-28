import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views.router.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);

/// Vistas
indexRouter.use("/", viewsRouter);

export default indexRouter;
