import ManagerFS from "./manager.fs.js";

const userFilePath = "./src/dao/fs/files/users.json"; 
const usersManager = new ManagerFS(userFilePath);

export default usersManager;