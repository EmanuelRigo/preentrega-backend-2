import CustomRouter from "../../utils/CustomRouter.util.js";
import productsApiRouter from "./products.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";
import cartApiRouter from "./carts.api.js";
import usersApiRouter from "./user.api.js";
import sum from "../../utils/process.util.js";
import { fork } from "child_process";

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
    this.read("/sum", ["PUBLIC"], (req, res) => {
      // const response = sum();
      // const message = "SUMATORIA OBTENIDA";

      // return res.json200(response, message);
      const child = fork("./src/utils/process.util.js");
      child.send("start");
      child.on("message", (response) => {
        const message = "SUMATORIA OBTENIDA";

        return res.json200(response, message);
      });
    });
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
