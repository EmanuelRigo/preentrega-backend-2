// import {
//   read,
//   create,
//   getAll,
//   update,
//   destroy,
//   readById,
//   addProduct,
// } from "../dao/mongo/managers/cart.manager.js";

import dao from "../dao/factory.js";
const { CartsManager } = dao;
console.log("🚀 ~ CartsManager :", CartsManager )




async function readService(data) {
  const response = await CartsManager.read(data);
  return response;
}

async function readAllService() {
  const response = await CartsManager.getAll();
  return response;
}

async function readOneService(id) {
  const response = await CartsManager.readById(id);
  return response;
}

async function createCartService(data) {
  const response = await CartsManager.create(data);
  return response;
}

async function updateCartService(id, data) {
  const response = await CartsManager.update(id, data);
  return response;
}

async function addProductService(data) {
  const response = await CartsManager.addProduct(data);
  return response;
}

const destroyService = async (id) => await CartsManager.destroy(id);

export {
  createCartService,
  readService,
  readAllService,
  readOneService,
  updateCartService,
  addProductService,
  destroyService,
};
