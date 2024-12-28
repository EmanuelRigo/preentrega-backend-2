import ManagerFS from "./manager.fs.js";

const productFilePath = "./src/dao/fs/files/products.json";

const productsManager = new ManagerFS(productFilePath);

export default productsManager;