import {
  readService,
  readAllService,
  createCartService,
} from "../services/carts.services.js";
import jwt from "jsonwebtoken";
import envUtil from "../utils/env.util.js";

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
    console.log("🚀 ~ createCartController ~  token:", token);

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

export { readCartsController, createCartController };
