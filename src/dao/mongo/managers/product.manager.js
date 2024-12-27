import Product from "../models/product.model.js";
import Manager from "./manager.js";

const productsManager = new Manager(Product);

export default productsManager;
// const { create, readById, update, destroy, getAll, getFiltered, getPaginated } =
//   productsManager;

// export { create, readById, update, destroy, getAll, getFiltered, getPaginated };
