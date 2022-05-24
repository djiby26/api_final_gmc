const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");

const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({});
  return res.send(200).json(carts);
});

const add = asyncHandler(async (req, res) => {
  const added = await Cart.create({
    userId: req.body.userId,
    products: req.body.products,
  });
  res.status(200).json(added);
});

const update = asyncHandler(async (req, res) => {
  const updated = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updated);
});

const deleteCart = asyncHandler(async (req, res) => {
  const deleted = await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json(deleted);
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find(req.params.userId);
  return res.send(200).json(cart);
});

module.exports = { getCarts, getCart, add, update, deleteCart };
