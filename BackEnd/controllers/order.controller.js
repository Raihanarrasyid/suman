import Order from "../models/Order.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, {
      name: 1,
      cartId: 1,
      mainAddressId: 1,
      OrderIdList: 1,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    if (user.mainAddressId === "") {
      return res
        .status(400)
        .json({ success: false, error: "Please add address" });
    }
    const products = await Cart.findById(user.cartId, {
      products: 1,
      totalPrice: 1,
      amountOfItem: 1,
    });
    const newOrder = new Order({
      userId: req.user.id,
      name: user.name,
      listProduct: products.products,
      addressId: user.mainAddressId,
      totalPrice: products.totalPrice,
      amountOfItem: products.amountOfItem,
    });
    const savedOrder = await newOrder.save();
    await Cart.findByIdAndUpdate(user.cartId, {
      products: [],
      amountOfItem: 0,
      totalPrice: 0,
    });
    const ListOfOrder = user.OrderIdList;
    ListOfOrder.push(savedOrder._id);
    await User.findByIdAndUpdate(req.user.id, { OrderIdList: ListOfOrder });
    res.status(200).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    if (req.file) {
      order.paymentPicture = `/assets/payments/${req.file.filename}`;
    } else {
      res.status(400).json({ success: false, error: "Please upload picture" });
    }
    order.status = "Paid";
    const savedOrder = await order.save();
    res.status(200).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    if (order.userId !== req.user.id) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    res.status(200).json({ success: true, order: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const adminGetOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    if (!req.user.isAdmin) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    res.status(200).json({ success: true, order: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    order.status = req.body.status;
    const savedOrder = await order.save();
    res.status(200).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order.userId !== req.user.id) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteOrderAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
