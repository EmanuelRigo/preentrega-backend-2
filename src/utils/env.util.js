import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil;

const path = "./.env." + env;
config({ path });

const envUtil = {
  PORT: process.env.PORT,
  MONGO_LINK: process.env.MONGO_LINK,
  SECRET_KEY: process.env.SECRET_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CART_COLLECTION: process.env.CART_COLLECTION,
  PRODUCTS_COLLECTION: process.env.PRODUCTS_COLLECTION,
  BASE_URL: process.env.BASE_URL,
};

export default envUtil;
