import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { size, motif, code } = req.body;

    const products = await Product.find();

    // Membuat regular expression berdasarkan size dan motif
    const sizeRegex = new RegExp(`- ${size}`, "i"); // Pencocokan tanpa memperhatikan huruf besar-kecil
    const motifRegex = new RegExp(`- ${motif}`, "i"); // Pencocokan tanpa memperhatikan huruf besar-kecil
    const codeRegex = new RegExp(`${code} -`, "i"); // Pencocokan tanpa memperhatikan huruf besar-kecil

    // Menggunakan operator $or untuk menyaring produk berdasarkan nama atau deskripsi
    const filteredProducts = products.filter((product) => {
      const nameMatch = product.name.match(sizeRegex);
      const descMatch = product.description.match(motifRegex);
      const codeMatch = product.name.match(codeRegex);

      return nameMatch && descMatch && codeMatch;
    });

    res.status(200).json({ products: filteredProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not Found!" });
    }
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
