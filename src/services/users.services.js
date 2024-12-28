import UserDTO from "../dto/user.dto.js";
import dao from "../dao/factory.js";

const { UsersManager } = dao;

async function createService(data) {
  data = new UserDTO(data);
  const response = await UsersManager.create(data);
  return response;
}

async function readService(params) {
  const response = await UsersManager.read();
  return response;
}

async function updateService(id, data) {
  const response = await UsersManager.update(id, data);
  return response;
}

const destroyService = async (id) => await UsersManager.destroy(id);

export { createService, readService, updateService, destroyService };
