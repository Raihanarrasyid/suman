import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        products: {
            type: Array,
            default: []
        },
        modifiedAt: {
            type: Date,
            default: Date.now
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        amountOfItem: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

const Order = mongoose.model("Cart", cartSchema);

export default Order;