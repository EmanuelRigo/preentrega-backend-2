import "dotenv/config.js";
import morgan from "morgan";
import express from "express";
import session from "express-session";
//import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";
import dbConnect from "./src/utils/dbconnect.utils.js";
import cookieParser from "cookie-parser";

//server
const server = express();
const port = process.env.PORT;
const ready = () => {
  console.log("server ready on port:" + port);
  dbConnect();
};
server.listen(port, ready);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser(process.env.SECRET_KEY));
// server.use(
//   session({
//     secret: process.env.SECRET_SESSION,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 },
//   })
// );

//CONFIGURACION DE SESSION CON FILE STORAGE

//const FileStore = sessionFileStore(session);

// server.use(
//   session({
//     secret: process.env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//     store: new FileStore({
//       path: "./src/data/fs/sessions",
//       ttl: 10,
//       retries: 2,
//     }),
//   })
// );

//CONFIGURACION DE SESSION CON MONGO STORAGE

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
