import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { readByEmail, create } from "../data/mongo/managers/users.manager.js";
import { createHashUtil } from "../utils/hash.util.js";

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          //no hace falta definirlo por que passport responde por defecto
        }
        const one = await readByEmail(email);
        if (one) {
          const error = new Error("User already exists");
          error.statusCode = 400;
          // throw error;
          // no se retorna el error porque en cambio se usa DONE
          return done(error);
        }
        req.body.password = createHashUtil(password);
        const data = req.body;
        const user = await create(data);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
      //la estrategia de passport es para simplificar los middlewares e incluso register
    }
  )
);

//passport.use("login", new LocalStrategy());

export default passport;
