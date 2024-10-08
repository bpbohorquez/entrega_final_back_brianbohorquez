import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: Array, default: [] },
});

productsSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productsCollection, productsSchema);

export default productModel;
