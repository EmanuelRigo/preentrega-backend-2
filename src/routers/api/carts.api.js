import CustomRouter from "../../utils/CustomRouter.util.js";
//import CartController from "../../dao/mongo/managers/cart.manager.js";
import passport from "../../middlewares/passport.mid.js";
import {
  createCartController,
  readCartsController,
  readOneCartController,
  updateCartController,
  destroyProductsController,
} from "../../controller/carts.controllers.js";

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["USER", "ADMIN", "PUBLIC"], readCartsController);

    this.read("/:cid", ["PUBLIC"], readOneCartController);

    this.create(
      "/",
      ["USER", "ADMIN"],
      passport.authenticate("online", { session: false }),
      createCartController
    );

    this.update("/:cid/products/:pid", ["PUBLIC"], updateCartController);
    ///TERMINAR ESTO!!!!!!!
    this.destroy("/:cid/products/:pid", async (req, res) => {
      const { cid, pid } = req.params;

      const cart = await controller.fOne({ _id: cid });
      if (!cart) {
        return res.status(404).send({ error: "Carrito no encontrado" });
      }

      const updatedProducts = cart.products.filter(
        (product) => product._id.toString() !== pid
      );

      const updatedCart = await controller.update(
        { _id: cid },
        { products: updatedProducts },
        { new: true }
      );

      res.status(200).send({ error: null, data: updatedCart });
    });

    this.destroy("/:cid", ["PUBLIC"], destroyProductsController);
  };
}

//const controller = new CartController();

let storeProducts = [];

const cartApiRouter = new CartsApiRouter();
export default cartApiRouter.getRouter();
