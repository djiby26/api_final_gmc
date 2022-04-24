const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
});

const addProduct = asyncHandler(async (req, res) => {
  const { title, description, price, image, isAvailable, category } = req.body;

  if (!title || !description || !price || !image) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const product = await Product.create({
    title: title,
    description: description,
    price: price,
    category: category,
    image: image,
    isAvailable: isAvailable,
  });

  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, price, image, isAvailable, category } = req.body;

  if (!title || !description || !price || !image) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.id);
  if (!result) {
    res.status();
  }
  res.status(200).json(result);
});

const getOneProduct = asyncHandler(async (req, res) => {
  const result = await Product.find({ _id: req.params.id });
  res.status(200).json(result);
});

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
};
