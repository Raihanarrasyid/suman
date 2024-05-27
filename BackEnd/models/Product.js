import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    pictureName: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pictureUrl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
