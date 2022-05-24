const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        productName: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantite: {
          type: Number,
          default: 1,
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    orderAmount: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Order", orderSchema);
