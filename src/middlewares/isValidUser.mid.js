import { readByEmail } from "../dao/mongo/managers/users.manager.js";

async function isValidUser(req, res, next) {
  const { email, password } = req.body;
  const one = await readByEmail(email);
  if (one) {
    return next();
  }
  const error = new Error("INVALID CREDENTIALS2");
  error.statusCode = 401;
  throw error;
}

export default isValidUser;
