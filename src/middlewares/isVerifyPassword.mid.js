import { readOne } from "../data/mongo/managers/users.manager.js";

async function isVerifyPassword(req, res, next) {
  try {
    const { email, password } = req.body;
    //verificamos que el usuario existe
    const one = await readOne(email);
    if (one) {
      //verificamos que la contraseña es correcta
      const verify = password === one.password;
      if (verify) {
        return next();
      }
    }

    const message = "INVALID CREDENTIALS";
    return res.status(401).json({ message });
  } catch (error) {
    return next(error);
  }
}

export default isVerifyPassword;
