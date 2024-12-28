import CustomRouter from "../../utils/CustomRouter.util.js";
import { verifyTokenUtil } from "../../utils/token.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";

import dao from "../../dao/factory.js";
const { UsersManager } = dao;
const {readById} = UsersManager;

class SessionApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    //REGISTER
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register", { session: false }),
      register
    );

    //LOGIN
    this.create(
      "/login",
      ["USER", "ADMIN", "PUBLIC"],
      passportCb("login", { session: false }),
      login
    );

    //SINGOUT
    this.create(
      "/signout",
      ["PUBLIC"],
      passportCb("signout", { session: false }),
      signout
    );

    //ONLINE
    this.create(
      "/online",
      ["PUBLIC"],
      passportCb("online", { session: false }),
      onlineToken
    );

    // GOOGLE
    this.read(
      "/google",
      ["PUBLIC"],
      passportCb("google", { scope: ["email", "profile"] })
    );

    this.read(
      "/google/cb",
      ["PUBLIC"],
      passportCb("google", { session: false }),
      google
    );
  };
}

async function register(req, res, next) {
  const { _id } = req.user;
  const message = "User Registered";
  return res.json201(_id, message);
}

async function login(req, res, next) {
  const token = req.token;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
  const message = "USER LOGGED IN";
  const response = "ok";
  return res.cookie("token", token, opts).json200(response, message);
}

function signout(req, res, next) {
  // req.session.destroy();
  const response = "OK";
  const message = "SIGN OUT";
  return res.clearCookie("token").json200(response, message);
}

async function online(req, res, next) {
  const { token } = req.headers;
  const data = verifyTokenUtil(token);
  const one = await readById(data.user_id);
  if (one) {
    return res.status(200).json({
      message: one.email.toUpperCase() + " IS ONLINE",
      online: true,
    });
  } else {
    return res
      .status(400)
      .json({ message: "USER IS NOT ONLINE", online: false });
  }
}

async function onlineToken(req, res, next) {
  const message = req.user.email.toUpperCase() + "IS ONLINE";
  const response = true;
  return res.json200(response, message);
}

async function onlineToken2(req, res, next) {
  // Obtener el token del header de Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided or invalid format",
      online: false,
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      online: false,
    });
  }

  const data = verifyTokenUtil(token);
  const user = await readById(data.user_id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      online: false,
    });
  }

  return res.status(200).json({
    message: user.email.toUpperCase() + " IS ONLINE",
    online: true,
    user: {
      email: user.email,
      role: user.role,
    },
  });
}

async function google(req, res, next) {
  return res.status(200).json({ message: "USER LOGGED IN", token: req.token });
}

const sessionsApiRouter = new SessionApiRouter();
export default sessionsApiRouter.getRouter();
