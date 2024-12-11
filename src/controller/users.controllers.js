import {
  createService,
  readService,
  updateService,
  destroyService,
} from "../services/users.services.js";

async function createUserController(req, res) {
  const message = "USER CREATED";
  const data = req.body;
  const response = await createService(data);
  return res.status(201).json({ response, message });
}
async function readUsersController(req, res) {
  const message = "USERS FOUND";
  const response = await readService();
  return res.status(200).json({ response, message });
}
async function updateUserController(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "USER UPDATED";
  const response = await updateService(id, data);
  return res.status(200).json({ response, message });
}
async function destroyUserController(req, res) {
  const { id } = req.params;
  const message = "USER DELETED";
  const response = await destroyService(id);
  return res.status(200).json({ response, message });
}

export {
  createUserController,
  readUsersController,
  updateUserController,
  destroyUserController,
};
