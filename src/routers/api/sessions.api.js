import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import { readById } from "../../data/mongo/managers/users.manager.js";
import { verifyTokenUtil } from "../../utils/token.util.js";

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
  passport.authenticate("signout", { session: false }),
  signout2
);

//ONLINE
sessionsRouter.post(
  "/online",
  passport.authenticate("online", { session: false }),
  onlineToken
);

// GOOGLE
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

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

async function online2(req, res, next) {
  try {
    const { user_id } = req.session;
    const one = await readById(user_id);
    if (req.session.user_id) {
      return res.status(200).json({
        message: one.email.toUpperCase() + " is online",
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

async function onlineToken(req, res, next) {
  try {
    return res.status(200).json({
      message: req.user.email.toUpperCase() + "IS ONLINE",
      online: true,
    });
  } catch (error) {
    return next(error);
  }
}

async function onlineToken2(req, res, next) {
  try {
    // Obtener el token del header de Authorization
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided or invalid format",
        online: false,
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token extraído:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        online: false,
      });
    }

    const data = verifyTokenUtil(token);
    console.log("Data del token:", data);

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
  } catch (error) {
    console.error("Error en onlineToken:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      online: false,
    });
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
