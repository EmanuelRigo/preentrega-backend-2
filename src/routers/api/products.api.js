import CustomRouter from "../../utils/CustomRouter.util.js";
import passport from "../../middlewares/passport.mid.js";
import {
  createProductController,
  destroyController,
  readAllController,
  readProductController,
  updateController,
} from "../../controller/products.controllers.js";

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create(
      "/",
      ["PUBLIC"],
      passport.authenticate("admin", { session: false }),
      createProductController
    );

    this.read("/", ["PUBLIC"], readProductController);

    this.read("/all", ["PUBLIC"], readAllController);

    this.update(
      "/:id",
      ["ADMIN"],
      passport.authenticate("admin", { session: false }),
      updateController
    );

    this.destroy(
      "/:id",
      ["PUBLIC"],
      passport.authenticate("admin", { session: false }),
      destroyController
    );
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();
