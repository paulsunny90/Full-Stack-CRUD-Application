import  Product from "../models/productModel.js"

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getProducts = async (req, res) => {
  try {

    const { category, sort } = req.query;

    let query = {};

    category && (query.category = category);

    let products = Product.find(query);

    sort === "low" && (products = products.sort({ price: 1 }));
    sort === "high" && (products = products.sort({ price: -1 }));
    sort === "latest" && (products = products.sort({ createdAt: -1 }));

    const result = await products;

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const orderProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    product.stock -= 1;

    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};