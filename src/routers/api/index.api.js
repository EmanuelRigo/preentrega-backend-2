import { Router } from "express";
import productsApiRouter from "./products.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";
import cartApiRouter from "./carts.api.js";

const apiRouter = Router();

apiRouter.use("/products", productsApiRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/carts", cartApiRouter);

export default apiRouter;
