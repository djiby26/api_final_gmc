const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

const addOrder = asyncHandler(async (req, res) => {
  // const { userId, products, orderAmount } = req.body;
  const order = new Order(req.body);

  try {
    const saved = await order.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json(error);
  }

  //   {
  //   userId,
  //   products,
  //   orderAmount,
  // });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const result = await Order.findByIdAndDelete(req.params.id);
  if (!result) {
    res.status();
  }
  res.status(200).json(result);
});

const getOneOrder = asyncHandler(async (req, res) => {
  const result = await Order.find({ _id: req.params.id });
  res.status(200).json(result);
});

const getOrdersByUserId = asyncHandler(async (req, res) => {
  const result = await Order.find({ userId: req.params.userId });
  res.status(200).json(result);
});

module.exports = {
  getOneOrder,
  getOrders,
  getOrdersByUserId,
  addOrder,
  deleteOrder,
};
