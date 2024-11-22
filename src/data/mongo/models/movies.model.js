import { model, Schema } from "mongoose";

const collection = "movies";
//ingles
//plural
//en minuscula

const schema = new Schema({
  title: { type: String, required: true, index: true },
  year: { type: Number, default: 10 },
  stock: { type: Number, default: 10 },
});

const Movie = model(collection, schema);
export default Movie;
