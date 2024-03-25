import mongoose from "mongoose";
//set rule
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 60,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
      maxlength: 60,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      trim: true,
      required: true,
      enum: [
        "grocery",
        "electronics",
        "furniture",
        "electrical",
        "kitchen",
        "kids",
        "sports",
        "auto",
        "clothes",
        "shoes",
        "pharmaceutical",
        "stationary",
        "cosmetics",
      ],
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    sellerId: {
      type: mongoose.ObjectId,
      required: true,
      ref: "users",
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    // 9860905388
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//create schema
const Product = mongoose.model("Product", productSchema);
export default Product;
