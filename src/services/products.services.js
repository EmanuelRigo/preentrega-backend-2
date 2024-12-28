import ProductsDTO from "../dto/product.dto.js";
import dao from "../dao/factory.js";
const { ProductsManager } = dao;

async function createService(data) {
  data = new ProductsDTO(data);
  const response = await ProductsManager.create(data);
  return response;
}

async function readFilteredService(opt) {
  const response = await ProductsManager.getFiltered(opt);
  return response;
}

async function readOneService(id) {
  const response = await ProductsManager.readById(id);
  return response;
}

async function readAllService() {
  const response = await ProductsManager.getAll();
  return response;
}

async function updateService(id, data) {
  const response = await ProductsManager.update(id, data);
  return response;
}

const destroyService = async (id) => await ProductsManager.destroy(id);

export {
  createService,
  readFilteredService,
  readAllService,
  readOneService,
  updateService,
  destroyService,
};
