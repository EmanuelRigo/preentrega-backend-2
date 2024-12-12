import CustomRouter from "../../utils/CustomRouter.util.js";
//import CartController from "../../data/mongo/managers/cart.manager.js";
import passport from "../../middlewares/passport.mid.js";
import {
  createCartController,
  readCartsController,
} from "../../controller/carts.controllers.js";

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["USER", "ADMIN", "PUBLIC"], readCartsController);

    this.read("/:cid", async (req, res) => {
      const cartID = req.params.cid;

      const cart = await controller.getOne({ _id: cartID });
      res.send({ cart });
    });

    this.create(
      "/",
      ["USER", "ADMIN"],
      passport.authenticate("online", { session: false }),
      createCartController
    );

    this.update("/:cid/products/:pid", async (req, res) => {
      const { cid, pid } = req.params;
      const cart = await controller.fOne({ _id: cid });

      if (!cart) {
        console.log("Carrito no encontrado:", cart);
        return res.status(406).send({ error: "Carrito no encontrado" });
      }

      const productInCart = cart.products.find(
        (product) => product._id.toString() === pid
      );

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cart.products.push({ _id: pid, quantity: 1 });
      }

      const cartToUpdate = {
        _id: cart._id.toString(),
        products: cart.products,
      };

      const updatedCart = await controller.addProduct(cartToUpdate);

      res.status(200).send({ error: null, data: updatedCart });
    });

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

    this.destroy("/:cid", async (req, res) => {
      const { cid } = req.params;

      const cart = await controller.fOne({ _id: cid });
      console.log("cart:", cart);

      if (!cart) {
        return res.status(404).send({ error: "Carrito no encontrado" });
      }

      const updatedCart = await controller.update(
        { _id: cid },
        { products: [] },
        { new: true }
      );

      res.status(200).send({ error: null, data: updatedCart });
    });
  };
}

//const controller = new CartController();

let storeProducts = [];

const cartApiRouter = new CartsApiRouter();
export default cartApiRouter.getRouter();
