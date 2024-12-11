import { createService } from "../services/products.services.js";

const createProductController = async (req, res) => {
  const message = "PRODUCT CREATED";
  const data = req.body;
  const response = await createService(data);
  return res.json201(response, message);
};

export { createProductController };
