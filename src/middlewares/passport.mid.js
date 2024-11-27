import passport, { Passport } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { readByEmail, create } from "../data/mongo/managers/users.manager.js";
import { createHashUtil } from "../utils/hash.util.js";
import { verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil } from "../utils/token.util.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

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

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        console.log("Iniciando proceso de autenticación para el email:", email);

        const user = await readByEmail(email);
        if (!user) {
          console.log("Usuario no encontrado para el email:", email);
          const error = new Error("INVALID CREDENTIALS");
          error.statusCode = 401;
          return done(error);
        }

        const dbPassword = user.password;
        console.log(
          "Contraseña de la base de datos recuperada para el usuario:",
          email
        );

        const verify = verifyHashUtil(password, dbPassword);
        if (!verify) {
          console.log(
            "La contraseña proporcionada es incorrecta para el usuario:",
            email
          );
          const error = new Error("INVALID CREDENTIALS");
          error.statusCode = 401;
          return done(error);
        }

        req.token = createTokenUtil({ role: user.role, user: user._id });
        console.log("Token generado para el usuario:", user._id);
        return done(null, user);
      } catch (error) {
        console.error("Error durante el proceso de autenticación:", error);
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
      callbackURL: BASE_URL + "sessions/google/cb",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        //desestruturamiento de google usuario y foto
        console.log("///////////////////////");
        console.log("//////GOOGLE");
        console.log(profile);
        console.log("GOOGLE/////");
        const { id, picture } = profile;
        //como estrategia de terceros no se suele registrar al usuario por su email
        let user = await readByEmail(id);
        //loguea si existe
        //sino, registra e inicia sesion
        if (!user) {
          user = await create({
            email: id,
            photo: picture,
            password: createHashUtil(id),
          });
        }
        req.token = createTokenUtil({ role: user.role, user: user._id });
        console.log("token:", token);
        // LOS DATOS DE LA SESSION SE DEBEN GUARDAR EN UN TOKEN
        // req.session.role = user.role;
        // req.session.user_id = user._id;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
