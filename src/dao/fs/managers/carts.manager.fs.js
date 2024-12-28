import ManagerFS from "./manager.fs.js";

const cartFilePath = "./path/to/carts.json"; // Asegúrate de que esta ruta sea correcta y accesible
const cartManager = new ManagerFS(cartFilePath);

export default cartManager;