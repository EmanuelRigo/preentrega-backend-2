import {
  create,
  read,
  update,
  destroy,
} from "../data/mongo/managers/users.manager.js";

async function createService(data) {
  const response = await create(data);
  return response;
}

async function readService(params) {
  const response = await read();
  return response;
}

async function updateService(id, data) {
  const response = await update(id, data);
  return response;
}

const destroyService = async (id) => await destroy(id);

export { createService, readService, updateService, destroyService };
