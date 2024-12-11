import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  createUserController,
  readUsersController,
  updateUserController,
  destroyUserController,
} from "../../controller/users.controllers.js";

class UsersApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createUserController);
    this.read("/", ["ADMIN"], readUsersController);
    this.update("/:id", ["USER", "ADMIN"], updateUserController);
    this.destroy("/:id", ["USER", "ADMIN"], destroyUserController);
  };
}

const usersApiRouter = new UsersApiRouter();
export default usersApiRouter.getRouter();
