import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema({
  title: { type: String, required: true, index: true },
  price: { type: Number, default: 10 },
  stock: { type: Number, default: 10 },
  status: { type: String, required: true },
  category: {
    type: String,
    enum: ["celulares", "tablets", "computadoras"],
    default: "computadoras",
  },
});

schema.plugin(mongoosePaginate);

const Product = model(collection, schema);

export default Product;
