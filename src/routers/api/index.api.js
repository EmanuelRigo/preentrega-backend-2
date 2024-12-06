import CustomRouter from "../../utils/CustomRouter.util.js";
import productsApiRouter from "./products.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";
import cartApiRouter from "./carts.api.js";
import usersApiRouter from "./user.api.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/products", productsApiRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/carts", cartApiRouter);
    this.use("/users", usersApiRouter);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
