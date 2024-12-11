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
import http from "http";
import { Server } from "socket.io";
import argsUtil from "./src/utils/args.util.js";
import envUtil from "./src/utils/env.util.js";

//server
const app = express();
const port = envUtil.PORT;

// Crea un servidor HTTP
const server = http.createServer(app);

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor listo en el puerto: ${port}`);
  console.log("server on mode", argsUtil.env);
  if (argsUtil.persistence === "mongo") {
    dbConnect();
  }
});
// Configura Socket.IO
const io = new Server(server);

// Manejo de conexiones de Socket.IO
io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado");

  // Aquí puedes manejar eventos de Socket.IO
  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado");
  });
});

// Configuración del motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${config.DIRNAME}/src/routers/views`);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(envUtil.SECRET_KEY));

// Configuración de sesión con MongoDB
app.use(
  session({
    secret: envUtil.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: envUtil.MONGO_LINK,
      ttl: 60 * 60 * 24,
    }),
  })
);

//routers
app.use(indexRouter);
app.use(errorHandler);
app.use(pathHandler);

console.log(argsUtil);
// console.log(process.pid);
// console.log(process.argv);
// console.log(process.argv[3]);
