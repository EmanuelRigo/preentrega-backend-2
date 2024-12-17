import {
  create,
  getFiltered,
  getAll,
  update,
  destroy,
  readById,
} from "../data/mongo/managers/product.manager.js";

async function createService(data) {
  const response = await create(data);
  return response;
}

async function readFilteredService(pg) {
  const response = await getFiltered(pg);
  return response;
}

async function readOneService(id) {
  const response = await readById(id);
  return response;
}

async function readAllService() {
  const response = await getAll();
  return response;
}

async function updateService(id, data) {
  const response = await update(id, data);
  return response;
}

const destroyService = async (id) => await destroy(id);

export {
  createService,
  readFilteredService,
  readAllService,
  readOneService,
  updateService,
  destroyService,
};
