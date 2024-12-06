import CustomRouter from "../../utils/CustomRouter.util.js";

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

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create(
      "/",
      passport.authenticate("admin", { session: false }),
      async (req, res, next) => {
        const message = "PRODUCT CREATED";
        const data = req.body;
        const response = await create(data);
        return res.json201(response, message);
      }
    );

    this.read("/", async (req, res) => {
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

      const response = await getFiltered(options);
      const message = "PRODUCTS UPDATED";
      if (response.docs.length > 0) {
        return res.json201(response, message);
      } else {
        return res.json404();
      }
    });

    this.read("/all", async (req, res) => {
      const response = await getAll();
      const message = "PRODUCTS UPDATED";
      if (response.length > 0) {
        return res.json201(response, message);
      } else {
        return res.json404();
      }
    });

    this.update(
      "/:id",
      passport.authenticate("admin", { session: false }),
      async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;
        const message = "PRODUCT UPDATED";
        const response = await update(id, data);

        if (response) {
          return res.json201(response, message);
        } else {
          return res.json404();
        }
      }
    );

    this.destroy(
      "/:id",
      passport.authenticate("admin", { session: false }),
      async (req, res, next) => {
        const { id } = req.params;

        const message = "PRODUCT DELETED";

        const response = await destroy(id);

        if (response) {
          return res.json201(response, message);
        } else {
          return res.json404();
        }
      }
    );
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();
