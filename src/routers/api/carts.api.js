import CustomRouter from "../../utils/CustomRouter.util.js";
//import CartController from "../../dao/mongo/managers/cart.manager.js";
import passport from "../../middlewares/passport.mid.js";
import {
  createCartController,
  readCartsController,
  readCartController,
  readOneCartController,
  updateCartController,
  destroyProductsController,
  destroyOneCartProductsController
} from "../../controller/carts.controllers.js";

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["USER", "ADMIN", "PUBLIC"], readCartsController);

    this.read("/:cid", ["PUBLIC"], readCartController);

    this.create(
      "/",
      ["USER", "ADMIN"],
      passport.authenticate("online", { session: false }),
      createCartController
    );

    this.update("/:cid/products/:pid", ["PUBLIC"], updateCartController);

    this.destroy("/:cid/products/:pid",["USER", "ADMIN"], destroyOneCartProductsController  );

    this.destroy("/:cid", ["PUBLIC"], destroyProductsController);
  };
}

//const controller = new CartController();

let storeProducts = [];

const cartApiRouter = new CartsApiRouter();
export default cartApiRouter.getRouter();
