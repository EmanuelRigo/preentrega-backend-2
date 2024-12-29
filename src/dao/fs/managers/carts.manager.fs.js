import ManagerFS from "./manager.fs.js";

const cartFilePath = "./src/dao/fs/files/carts.json";
const cartManager = new ManagerFS(cartFilePath);

export default cartManager;