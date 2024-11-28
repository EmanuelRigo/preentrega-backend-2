import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  stock: { type: Number, required: true },
});

// Asegúrate de que el plugin esté registrado
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);
export default Product;
