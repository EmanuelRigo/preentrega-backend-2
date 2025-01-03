import dbConnect from "../utils/dbconnect.utils.js";
import argsUtil from "../utils/args.util.js";

const { persistence } = argsUtil;

let dao = {};

switch (persistence) {
  case "fs":
    console.log("connected to FS");
    const { default: ProductsManagerFS } = await import(
      "./fs/managers/products.manager.fs.js"
    );
    const { default: UsersManagerFS } = await import("./fs/managers/users.manager.fs.js");
    const { default: CartsManagerFS } = await import("./fs/managers/carts.manager.fs.js");
    dao = {
      ProductsManager: ProductsManagerFS,
      UsersManager: UsersManagerFS,
      CartsManager: CartsManagerFS,
    };
    break;
  default:
    console.log("connected to mongo system");
    dbConnect();
    const { default: ProductsManagerMongo } = await import(
      "./mongo/managers/product.manager.js"
    );
    const { default: UsersManagerMongo } = await import(
      "./mongo/managers/users.manager.js"
    );
    const { default: CartsManagerMongo } = await import(
      "./mongo/managers/cart.manager.js"
    );
    dao = {
      ProductsManager: ProductsManagerMongo,
      UsersManager: UsersManagerMongo,
      CartsManager: CartsManagerMongo,
    };
    break;
}

export default dao; 