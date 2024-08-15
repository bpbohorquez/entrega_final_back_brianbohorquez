import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  products: {
    type: [
      { product: { type: mongoose.Schema.Types.ObjectId, ref: "products" } },
    ],
    required: true,
  },
});

cartsSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model(cartsCollection, cartsSchema);

export default cartModel;
