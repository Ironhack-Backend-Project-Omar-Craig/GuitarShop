const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productType: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    colour: {
      type: [String],
    },
    description: {
      type: String,
      trim: true,
    },
    frets: {
      type: Number,
    },
    pickups: {
      type: [String],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
