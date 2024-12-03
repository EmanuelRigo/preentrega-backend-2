import productModel from "./models/product.model.js";

class ProductController {
  constructor() {}
  //listo
  getAll = async () => {
    try {
      return await productModel.find().lean();
    } catch (err) {
      return err.message;
    }
  };
  //listo
  get = async (options) => {
    try {
      const { limit, page, sort, filter } = options;

      let sortOptions = {};
      if (sort) {
        sortOptions = sort === "asc" ? { price: 1 } : { price: -1 };
      }

      const query = filter || {};

      return await productModel.paginate(query, {
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
        sort: sortOptions,
        lean: true,
      });
    } catch (err) {
      console.error("Error en get:", err);
      return err.message;
    }
  };
  //listo
  getOne = async (data) => {
    try {
      console.log("data:", data);
      return await productModel.findOne(data).lean();
    } catch (err) {
      console.error("Error al buscar el producto:", err);
      return null;
    }
  };

  getPaginated = async (pg) => {
    try {
      const page = pg || 1;
      return await productModel.paginate(
        {},
        { limit: 10, page: page, lean: true }
      );
    } catch (err) {
      return err.message;
    }
  };

  add = async (data) => {
    try {
      return await productModel.create(data);
    } catch (err) {
      return err.message;
    }
  };

  update = async (filter, updated, options) => {
    try {
      return await productModel.findOneAndUpdate(filter, updated, options);
    } catch (err) {
      return err.message;
    }
  };

  delete = async (data, options) => {
    try {
      return await productModel.findOneAndDelete(data, options);
    } catch (err) {
      return err.message;
    }
  };
}

export default ProductController;
