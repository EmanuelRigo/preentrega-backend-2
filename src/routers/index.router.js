import CustomRouter from "../utils/CustomRouter.util.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views.router.js";

class IndexRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  };
}

let indexRouter = new IndexRouter();
indexRouter = indexRouter.getRouter();
export default indexRouter;
