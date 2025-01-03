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
    this.use("/products", ["PUBLIC"], productsApiRouter);
    this.use("/cookies", ["PUBLIC"], cookiesRouter);
    this.use("/sessions", ["PUBLIC"], sessionsRouter);
    this.use("/carts", ["PUBLIC"], cartApiRouter);
    this.use("/users", ["PUBLIC"], usersApiRouter);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
