import {
  read,
  create,
  getAll,
  update,
  destroy,
} from "../data/mongo/managers/cart.manager.js";

async function readService(data) {
  const response = await read(data);
  return response;
}

async function readAllService() {
  const response = await getAll();
  return response;
}
async function createCartService(data) {
  const response = await create(data);
  return response;
}

async function updateCartService(id, data) {
  const response = await update(id, data);
  return response;
}

// async function readFilteredService(pg) {
//   const response = await getFiltered(pg);
//   return response;
// }

// async function updateService(id, data) {
//   const response = await update(id, data);
//   return response;
// }

const destroyService = async (id) => await destroy(id);

export { createCartService, readService, readAllService, updateCartService };
