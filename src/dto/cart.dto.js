import crypto from "crypto";
import argsUtil from "../utils/args.util.js";

const { persistence } = argsUtil;

class CartDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = data.user_id;
    this.products = data.products.map(product => ({
      product_id: product.product_id,
      quantity: product.quantity || 1,
    }));
    this.state = data.state || "reserved";
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default CartDTO;