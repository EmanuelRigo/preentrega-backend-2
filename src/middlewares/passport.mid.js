import passport, { Passport } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import {
  readByEmail,
  create,
  readById,
  update,
} from "../data/mongo/managers/users.manager.js";
import { createHashUtil } from "../utils/hash.util.js";
import { verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

//--REGISTER
passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        const userExists = await readByEmail(email);
        if (userExists) {
          const error = new Error("User already exists");
          error.statusCode = 400;
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
//--LOGIN
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
          const error = new Error("INVALID CREDENTIALS");
          error.statusCode = 401;
          return done(error);
        }

        const token = createTokenUtil({ role: user.role, user: user._id });
        req.token = token;
        await update(user._id, { isOnline: true });
        console.log(req.token);
        console.log("Token generado para el usuario:", user._id);
        console.log(user);
        return done(null, user);
      } catch (error) {
        console.error("Error durante el proceso de autenticación:", error);
        return done(error);
      }
    }
  )
);
//--ADMIN
passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    (data, done) => {
      try {
        console.log(data);
        const { user_id, role } = data;
        if (role !== "ADMIN") {
          const error = new Error("NOT AUTHORIZED");
          error.statusCode = 403;
          return done(error);
        }
        return done(null, { user_id });
      } catch (error) {
        return done(error);
      }
    }
  )
);
//--GOOGLE
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
//--SINGOUT
passport.use(
  "singout",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const token = req.token;
        if (!token) {
          const error = new Error("USER NOT LOGED");
          error.statusCode = 401;
          return done(error);
        }
        delete req.token;
        return done(null, null);
      } catch (error) {
        return done(error);
      }
    }
  )
);
//--ONLINE
passport.use(
  "online",
  new LocalStrategy(
    {
      // passReqToCallback: true,
      // usernameField: "email",
      // passwordField: "password",
    },
    async (req, email, password, done) => {
      try {
        console.log("hola");
        // const token = req.token;
        // console.log("token:", token);
        // const { user_id } = verifyTokenUtil(token);
        // const user = await readById(user_id);
        // const { isOnline } = user;
        // if (!isOnline) {
        //   const error = new Error("USER IS NOT ONLINE");
        //   error.statusCode = 401;
        //   return done(error);
        // }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
