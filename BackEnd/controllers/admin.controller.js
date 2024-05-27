import Product from "../models/Product.js";

export const getAdmin = (req, res) => {
  res.json("Admin Page");
};

export const addProduct = async (req, res) => {
  // add product
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a file" });
  }
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    longDescription: req.body.longDescription,
    pictureUrl: `/assets/products/${req.file.filename}`,
    pictureName: req.file.filename,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({ message: "Success", product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: "terjadi kesalahan penyimpanan" });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, description, price } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.longDescription = req.body.longDescription;
    if (req.file) {
      product.pictureUrl = `/assets/products/${req.file.filename}`;
    }

    const savedProduct = await product.save();
    res.status(200).json({ message: "Success", product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log("delete product");
  console.log(id);
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne({ _id: id });

    res.status(200).json({ message: "Success: Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAdmin, addProduct, updateProduct, deleteProduct };
