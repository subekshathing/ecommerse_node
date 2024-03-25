import mongoose, { model } from "mongoose";
//set rule
const cartShema = new mongoose.Schema({
  buyerId: {
    type: mongoose.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {
    type: mongoose.ObjectId,
    ref: "products",
    required: true,
  },
  orderedQuantity: {
    type: Number,
  },
});
//create table

const Cart = mongoose.model("Cart", cartShema);
export default Cart;
