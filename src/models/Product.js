const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    // category: {
    //   type: String,
    //   required: true,
    // },
    image: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isAddedInCart: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", productSchema);
