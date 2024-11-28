import "dotenv/config.js";
import morgan from "morgan";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";
import dbConnect from "./src/utils/dbconnect.utils.js";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import config from "./config.js";

//server
const server = express();
const port = process.env.PORT;

const ready = () => {
  console.log("server ready on port:" + port);
  dbConnect();
};

server.listen(port, ready);

// Activo el motor de plantillas
server.engine("handlebars", handlebars.engine());
server.set("views", `${config.DIRNAME}/src/routers/views`);
server.set("view engine", "handlebars");

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser(process.env.SECRET_KEY));

// Configuración de sesión con MongoDB
server.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_LINK,
      ttl: 60 * 60 * 24,
    }),
  })
);

//routers
server.use(indexRouter);
server.use(errorHandler);
server.use(pathHandler);
