// import {
//   create,
//   readById,
//   update,
//   destroy,
//   getAll,
//   getFiltered,
// } from "../data/mongo/managers/product.manager";

import { create } from "../data/mongo/managers/product.manager.js";

async function createService(data) {
  const response = await create(data);
  return response;
}

export { createService };
