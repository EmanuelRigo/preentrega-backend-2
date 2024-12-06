import { Router } from "express";
import CartController from "../data/mongo/managers/cart.manager.js";
import {
  readById,
  getPaginated,
} from "../data/mongo/managers/product.manager.js";

const CaController = new CartController();
const router = Router();

//ok
router.get("/products", async (req, res) => {
  try {
    let url = "http://localhost:9000/api/products";
    const queryParams = new URLSearchParams(req.query);
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
    const response = await fetch(url);
    const products = await response.json();
    res.render("home", { products: products.response });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los productos" });
  }
});

//ok
router.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    console.log("pid:", pid);

    // Añadir .lean() a la consulta
    const product = await readById({ _id: pid });
    res.render("product", { product });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los productos" });
  }
});

//ok
router.get("/:cid/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const cid = req.params.cid;
  try {
    const product = await ProController.getOne({ _id: pid });
    res.render("product", { product, cid });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los productos" });
  }
});

//ok
router.get("/products/paginated/:pg", async (req, res) => {
  const pg = req.params.pg;
  const products = await getPaginated(pg);
  res.status(200).render("home", { products });
});

//ok
router.get("/:cid/products", async (req, res) => {
  const cid = req.params.cid;

  try {
    let url = "http://localhost:9000/api/products";

    const queryParams = new URLSearchParams(req.query);

    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
    const response = await fetch(url);
    const products = await response.json();
    res.render("home", { products: products.data, cid });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los productos" });
  }
});

//ok
router.get("/realTimeProducts", (req, res) => {
  res.status(200).render("realTimeProducts");
});

router.get("/realTimeProducts/paginated/:pg", (req, res) => {
  const pg = req.params.pg;
  res.status(200).render("realTimeProducts", { pg });
});

//ok
router.get("/carts", async (req, res) => {
  try {
    const response = await fetch("http://localhost:9000/api/carts");
    const carts = await response.json();
    //  console.log('carts:',carts)
    res.render("carts", { carts: carts.data });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los productos" });
  }
});

//ok
router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CaController.getOne({ _id: cid });
  res.status(200).render("cart", { cart });
});

router.get("/register", (req, res) => {
  res.status(200).render("register");
});

router.get("/login", (req, res) => {
  res.status(200).render("login");
});

export default router;
