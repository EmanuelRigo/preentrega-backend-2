import ManagerFS from "./manager.fs.js";

const userFilePath = "./src/dao/fs/files/users.json"; // Asegúrate de que esta ruta sea correcta y accesible
const usersManager = new ManagerFS(userFilePath);

export default usersManager;