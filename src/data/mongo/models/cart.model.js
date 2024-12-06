import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Anulamos comportamiento de renombre por defecto de colecciones
mongoose.pluralize(null);

// Colección
const collection = process.env.CART_COLLECTION;

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: process.env.PRODUCTS_COLLECTION,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  { timestamps: true }
);
schema.plugin(mongoosePaginate);

// Generamos modelo
const cartModel = mongoose.model(collection, schema);

export default cartModel;
