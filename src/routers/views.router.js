import { Router } from "express";
//import CartController from "../dao/mongo/managers/cart.manager.js";
// import {
//   readById,
//   getPaginated,
// } from "../dao/mongo/managers/product.manager.js";
// import { readByIdPopulate } from "../dao/mongo/managers/cart.manager.js";
// import { readCartsController } from "../controller/carts.controllers.js";

// import dao from "../dao/factory.js";
// const {productManager} = dao; 

//const CaController = new CartController();
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
  console.log("pid:", pid)
  try {
    let url = `http://localhost:9000/api/products/${pid}`;
    const response = await fetch(url);
    const product = await response.json();
    res.render("product", { product: product.response });
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
    let url = `http://localhost:9000/api/products/${pid}`;
    const response = await fetch(url);
    const product = await response.json();
    res.render("product", { product: product.response, cid });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los productos" });
  }
});
//ok
router.get("/products/paginated/:pg", async (req, res) => {
  const { pg } = req.params; 
  try {
    let url = `http://localhost:9000/api/products/paginated/${pg}`;
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
    res.render("home", { products: products.response, cid });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los productos" });
  }
});

//ok
router.get("/realTimeProducts", async (req, res) => {
  try {
    let url = "http://localhost:9000/api/products/all";
    const response = await fetch(url);
    const products = await response.json();
    res.render("realTimeProducts", { products: products.response });
  } catch (error) {
    console.error("Error al obtener carts:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los carritos" });
  }
});
//ok
router.get("/carts", async (req, res) => {
  try {
    let url = "http://localhost:9000/api/carts";
    const response = await fetch(url);
    const carts = await response.json();
    res.render("carts", { carts: carts.data });
  } catch (error) {
    console.error("Error al obtener carts:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los carritos" });
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid; 
  try {
    let url = `http://localhost:9000/api/carts/${cid}`;
    const response = await fetch(url);
    const cart = await response.json();
    console.log("🚀 ~ router.get ~ cart:", cart)
    
    res.render("cart", { cart: cart.data });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .render("error", { message: "Error al cargar los productos" });
  }
});
//ok
router.get("/register", (req, res) => {
  res.status(200).render("register");
});
//ok
router.get("/login", (req, res) => {
  res.status(200).render("login");
});

export default router;
