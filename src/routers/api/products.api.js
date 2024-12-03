import { Router } from "express";
import {
  create,
  readById,
  update,
  destroy,
  getAll,
  getFiltered,
  getPaginated,
} from "../../data/mongo/managers/product.manager.js";
//import ProductController from "../../dao/product.controller.js";
import passport from "../../middlewares/passport.mid.js";

const productsApiRouter = Router();

//const controller = new ProductController();

productsApiRouter.post(
  "/",
  // passport.authenticate("admin", { session: false }),
  async (req, res, next) => {
    try {
      const message = "PRODUCT CREATED";
      const data = req.body;
      const response = await create(data);
      return res.status(201).json({ response, message });
    } catch {
      return next(error);
    }
  }
);

productsApiRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query, available } = req.query;

    const limitNumber = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);

    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res
        .status(400)
        .send({ error: "El parámetro 'limit' debe ser un número positivo." });
    }

    if (isNaN(pageNumber) || pageNumber <= 0) {
      return res
        .status(400)
        .send({ error: "El parámetro 'page' debe ser un número positivo." });
    }
    const filter = {};
    if (query) {
      console.log("si query", query);
      filter.category = query;
      console.log("filter::", filter);
    }

    if (available) {
      if (available === "true") {
        filter.status = true;
      } else if (available === "false") {
        filter.status = false;
      }
      console.log("filter con disponibilidad:", filter);
    }

    const options = {
      limit: limitNumber,
      page: pageNumber,
      sort,
      filter: filter,
    };

    const data = await getFiltered(options);

    res.status(200).send({ error: null, data });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

productsApiRouter.get("/all", async (req, res) => {
  const data = await getAll();
  res.status(200).send({ error: null, data });
});

productsApiRouter.put(
  "/:id",
  passport.authenticate("admin", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = req.body;

      const message = "PRODUCT UPDATED";

      const response = await update(id, data);

      return res.status(200).json({ response, message });
    } catch (error) {
      return next(error);
    }
  }
);

productsApiRouter.delete(
  "/:id",
  passport.authenticate("admin", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const message = "PRODUCT DELETED";

      const response = await destroy(id);

      return res.status(200).json({ response, message });
    } catch (error) {
      return next(error);
    }
  }
);

export default productsApiRouter;
