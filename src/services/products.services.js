// import {
//   create,
//   getFiltered,
//   getAll,
//   update,
//   destroy,
//   readById,
// } from "../dao/mongo/managers/product.manager.js";

import dao from "../dao/factory.js";
console.log("🚀 ~ dao:", dao);

const { ProductsManager } = dao;
console.log("🚀 ~ productManager:", ProductsManager);

async function createService(data) {
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
