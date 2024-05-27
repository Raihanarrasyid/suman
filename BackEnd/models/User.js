import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    mainAddressId: {
      type: String,
      default: "",
    },
    addressIdList: {
      type: Array,
      default: [],
    },
    cartId: {
      type: String,
    },
    OrderIdList: {
      type: Array,
      default: [],
    },
    wishlistId: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
