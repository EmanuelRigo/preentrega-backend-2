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

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  register
);

sessionsRouter.post("/login", isValidUser, verifyHash, login);

sessionsRouter.post("/signout", signout);

sessionsRouter.post("/online", online);

async function register(req, res, next) {
  try {
    return res.status(201).json({ message: "USER REGISTERED" });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email } = req.body;
    const one = await readByEmail(email);
    req.session.role = one.role;
    req.session.user_id = one._id;
    return res
      .status(200)
      .json({ message: "USER LOGGED IN", user_id: one._id });
  } catch (error) {
    return next(error);
  }
}

async function signout(req, res, next) {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "USER SINGNED OUT" });
  } catch (error) {
    return next(error);
  }
}

async function online(req, res, next) {
  try {
    const { user_id } = req.session;
    const one = await readById(user_id);
    if (req.session.user_id) {
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

export default sessionsRouter;
