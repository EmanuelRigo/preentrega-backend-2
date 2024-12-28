import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import envUtil from "../../../utils/env.util.js";

// Anulamos comportamiento de renombre por defecto de colecciones
mongoose.pluralize(null);

// Colección
const collection = envUtil.CART_COLLECTION;

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
       _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: envUtil.PRODUCTS_COLLECTION,
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
