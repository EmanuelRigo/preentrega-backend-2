import { readByEmail } from "../data/mongo/managers/users.manager.js";

async function isValidUser(req, res, next) {
  try {
    const { email, password } = req.body;
    //verificamos que el usuario existe
    const one = await readByEmail(email);
    if (one) {
      //verificamos que la contraseña es correcta
      return next();
    }
    const error = new Error("INVALID CREDENTIALS2");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}

export default isValidUser;
