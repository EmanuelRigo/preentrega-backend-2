import { Router } from "express";

class CustomRouter {
  constructor() {
    this._router = Router();
  }
  getRouter = () => this._router;
  //applyCallbacks() depende de todos los middlewares que necesite ejecutar
  //mapeamos los middlewares para que se ejecuten cada uno con req, res, next
  applyCallbacks = (callbacks) =>
    callbacks.map((cb) => async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        return next(error);
      }
    });

  create = (path, ...cbs) => this._router.post(path, this.applyCallbacks(cbs));
  read = (path, ...cbs) => this._router.get(path, this.applyCallbacks(cbs));
  update = (path, ...cbs) => this._router.put(path, this.applyCallbacks(cbs));
  destroy = (path, ...cbs) =>
    this._router.delete(path, this.applyCallbacks(cbs));
  use = (path, ...cbs) => this._router.use(path, this.applyCallbacks(cbs));
}

export default CustomRouter;
