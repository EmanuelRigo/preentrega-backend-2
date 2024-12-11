import envUtil from "./env.util.js";
import jwt from "jsonwebtoken";
const { SECRET_KEY } = envUtil;

function createTokenUtil(data) {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
  return token;
}

function verifyTokenUtil(token) {
  const verify = jwt.verify(token, SECRET_KEY);
  return verify;
}

export { createTokenUtil, verifyTokenUtil };
