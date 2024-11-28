import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Anulamos comportamiento de renombre por defecto de colecciones
mongoose.pluralize(null);

// Colección
const collection = process.env.PRODUCTS_COLLECTION;

// Definición del esquema
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    thumbnails: { type: [String], default: [] },
  },
  { timestamps: true }
);
schema.plugin(mongoosePaginate);

// Generamos modelo, evitando la redefinición
const productModel =
  mongoose.models[collection] || mongoose.model(collection, schema);

export default productModel;
