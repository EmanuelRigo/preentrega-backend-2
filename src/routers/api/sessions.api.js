import { response, Router } from "express";
import { readByEmail } from "../../data/mongo/managers/users.manager.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidUserData from "../../middlewares/isValidUserData.mid.js";
import isUser from "../../middlewares/isUser.mid.js";
import passport from "../../middlewares/passport.mid.js";
import { readById } from "../../data/mongo/managers/users.manager.js";
import createHash from "../../middlewares/createHash.mid.js";
import verifyHash from "../../middlewares/verifyHash.mid.js";

const sessionsRouter = Router();

//REGISTER
sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  register
);

//LOGIN
sessionsRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  login
);

//SINGOUT
sessionsRouter.post(
  "/signout",
  // passport.authenticate("signout", { session: false }),
  signout2
);
//ONLINE
sessionsRouter.post("/online", online2);

// GOOGLE
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// /api/session/google/cb va a llamar efectivamente a la estrategia

sessionsRouter.get(
  "/google/cb",
  passport.authenticate("google", { session: false }),
  google
);

async function register(req, res, next) {
  try {
    const user = req.user;
    return res
      .status(201)
      .json({ message: "USER REGISTERED", user, user_id: user._id });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    return res
      .status(200)
      .json({ message: "USER LOGGED IN", token: req.token });
  } catch (error) {
    return next(error);
  }
}

function signout(req, res, next) {
  const message = "User signed out!";
  const response = "OK";
  return res.clearCookie("token").json200(response, message);
}

function signout2(req, res, next) {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "USER SIGNED OUT" });
  } catch (error) {
    return next(error);
  }
}

async function online(req, res, next) {
  try {
    const { token } = req.headers;
    console.log(req.headers);
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
  } catch (error) {
    return next(error);
  }
}

function online2(req, res, next) {
  try {
    if (req.session.user_id) {
      return res.status(200).json({ message: "USER IS ONLINE", online: true });
    } else {
      return res
        .status(400)
        .json({ message: "USER IS NOT ONLINE", online: false });
    }
  } catch (error) {
    return next(error);
  }
}

async function onlineToken(req, res, next) {
  try {
    console.log("req.user:", req.user);
    return res.status(200).json({
      message: req.user.email.toUpperCase() + "IS ONLINE",
      online: true,
    });
  } catch (error) {
    return next(error);
  }
}

async function google(req, res, next) {
  try {
    return res
      .status(200)
      .json({ message: "USER LOGGED IN", token: req.token });
  } catch (error) {
    return next(error);
  }
}

export default sessionsRouter;
