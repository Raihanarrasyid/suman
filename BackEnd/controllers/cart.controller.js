import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  const cart = await Cart.findById(user.cartId);
  if (!cart) {
    // create new cart if not exist
    const savedCart = await createCart(user);

    return res.status(200).json({ cart: savedCart });
  }
  res.status(200).json({ cart: cart });
};

const createCart = async (user) => {
  const newCart = new Cart({
    products: [],
    totalPrice: 0,
  });
  const savedCart = await newCart.save();
  user.cartId = savedCart._id;
  user.save();
  return savedCart;
};

export const incrementProductInCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(401).json({ message: "You are not logged in" });

    let cart = await Cart.findById(user.cartId);
    if (!cart) cart = await createCart(user);

    const product = await Product.findById(req.body.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let size = "M";
    if (req.body.size) size = req.body.size;
    const productIndex = cart.products.findIndex(
      (item) =>
        item.product.toString() === product._id.toString() && size === item.size
    );
    let amount = 0;
    if (productIndex === -1) {
      amount = +req.body.amount;

      if (amount === 0) {
        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
        }
      } else if (productIndex !== -1) {
        cart.products[productIndex] = {
          pictureUrl: product.pictureUrl,
          name: product.name,
          description: product.description,
          product: product._id,
          amount: amount,
          price: product.price,
          size: size,
        };
      } else {
        cart.products.push({
          pictureUrl: product.pictureUrl,
          name: product.name,
          description: product.description,
          product: product._id,
          amount: amount,
          price: product.price,
          size: size,
        });
      }
    } else {
      amount = cart.products[productIndex].amount + req.body.amount;
      cart.products[productIndex] = {
        pictureUrl: product.pictureUrl,
        name: product.name,
        description: product.description,
        product: product._id,
        amount: amount,
        price: product.price,
        size: size,
      };
    }
    let amountOfItem = 0;
    let totalPrice = 0;

    for (let i = 0; i < cart.products.length; i++) {
      amountOfItem += cart.products[i].amount;
      totalPrice += cart.products[i].price * cart.products[i].amount;
    }

    cart.totalPrice = totalPrice;
    cart.amountOfItem = amountOfItem;

    await cart.save();

    res.status(200).json({ message: "Success", cart: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editProductInCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(401).json({ message: "You are not logged in" });
    let cart = await Cart.findById(user.cartId);
    if (!cart) cart = await createCart(user);
    const allProducts = req.body.products;
    if (!allProducts) return res.status(404).json({ message: "No products" });
    cart.products = allProducts;
    let amountOfItem = 0;
    let totalPrice = 0;
    for (let i = 0; i < cart.products.length; i++) {
      amountOfItem += cart.products[i].amount;
      totalPrice += cart.products[i].price * cart.products[i].amount;
    }
    cart.totalPrice = totalPrice;
    cart.amountOfItem = amountOfItem;
    await cart.save();
    res.status(200).json({ message: "Success", cart: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveProductToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(401).json({ message: "You are not logged in" });

    let cart = await Cart.findById(user.cartId);
    if (!cart) cart = await createCart(user);

    const product = await Product.findById(req.body.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let size = "M";
    if (req.body.size) size = req.body.size;
    const productIndex = cart.products.findIndex(
      (item) =>
        item.product.toString() === product._id.toString() && size === item.size
    );
    const amount = +req.body.amount;

    if (amount === 0) {
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
      }
    } else if (productIndex !== -1) {
      cart.products[productIndex] = {
        image: product.pictureUrl,
        name: product.name,
        description: product.description,
        product: product._id,
        amount: amount,
        price: product.price,
        size: size,
      };
    } else {
      cart.products.push({
        image: product.pictureUrl,
        name: product.name,
        description: product.description,
        product: product._id,
        amount: amount,
        price: product.price,
        size: size,
      });
    }

    let amountOfItem = 0;
    let totalPrice = 0;

    for (let i = 0; i < cart.products.length; i++) {
      amountOfItem += cart.products[i].amount;
      totalPrice += cart.products[i].price * cart.products[i].amount;
    }

    cart.totalPrice = totalPrice;
    cart.amountOfItem = amountOfItem;

    await cart.save();

    const successMessage =
      productIndex !== -1 ? "Product already in cart" : "Product added";
    res.status(200).json({ message: `Success: ${successMessage}`, cart: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
