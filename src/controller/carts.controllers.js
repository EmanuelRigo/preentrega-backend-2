import {
  readService,
  readAllService,
  readOneService,
  createCartService,
  addProductService,
  destroyService,
  updateCartService,
} from "../services/carts.services.js";
import jwt from "jsonwebtoken";
import envUtil from "../utils/env.util.js";

async function readCartController(req, res) {
  try {
    const id = req.params.cid;
    const process = await readService(id);
    return res.status(200).send({ error: null, data: process });
  } catch (error) {
    console.log("Error al leer el carrito", error);
    return res.status(500).send({ error: "Error al leer el carrito" });
  }
}

async function readOneCartController(req, res) {
  const id = req.params.cid;
  console.log("cid", id);

  const response = await readOneService(id);
  console.log("reponse", response);
  const message = "CART READ";
  if (response) {
    return res.json201(response, message);
  } else {
    return res.json404();
  }
}

async function readCartsController(req, res) {
  console.log("READCONTROLLERS!!!!!!!!!!!!!!");
  try {
    const process = await readAllService();
    console.log("process:", process);
    return res.status(200).send({ error: null, data: process });
  } catch (error) {
    console.error("Error al leer los carritos:", error);
    return res.status(500).send({ error: "Error al leer los carritos" });
  }
}

async function createCartController(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ error: "No se proporcionó token" });
    }
    const decoded = jwt.verify(token, envUtil.SECRET_KEY);
    console.log("Contenido decodificado del token:", decoded);

    const userId = decoded.user_id;
    if (!userId) {
      return res
        .status(401)
        .send({ error: "ID de usuario no encontrado en el token" });
    }
    const process = await createCartService({ products: [], user_id: userId });
    res.status(201).send({ error: null, data: process });
  } catch (error) {
    console.error("Error al crear el carrito1:", error);
    res.status(500).send({ error: "Error al crear el carrito" });
  }
}

async function updateCartController(req, res) {
  try {
    const pid = req.params.pid;
    console.log("pid2:", pid);
    const cid = req.params.cid;
    console.log("cid:", cid);
    const cart = await readOneService({ _id: cid });
    console.log("cart::", cart);
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

    const updatedCart = await addProductService(cartToUpdate);
    console.log("🚀 ~ updateCartController ~ updatedCart :", updatedCart);

    res.status(200).send({ error: null, data: updatedCart });
  } catch (error) {
    console.log("error al hacer update en el carrito", error);
    res.status(500).send({ error: "Error al hacer update" });
  }
}

async function destroyProductsController(req, res) {
  const { cid } = req.params;
  const cart = await readOneService({ _id: cid });
  if (!cart) {
    return res.status(404).send({ error: "Carrito no encontrado" });
  }
  const updatedCart = await updateCartService(
    { _id: cid },
    { products: [] },
    { new: true }
  );
  res.status(200).send({ error: null, data: updatedCart });
}

export {
  readCartsController,
  readOneCartController,
  createCartController,
  updateCartController,
  destroyProductsController,
};
