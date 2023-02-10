const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/search", async (req, res, next) => {
  const { searchString } = req.body;
  const searchResults = await Product.find({
    $or: [
      { manufacturer: { $regex: searchString, $options: "i" } },
      { productType: { $regex: searchString, $options: "i" } },
      { productName: { $regex: searchString, $options: "i" } },
      { model: { $regex: searchString, $options: "i" } },
      { colour: { $regex: searchString, $options: "i" } },
    ],
  });
  res.render("all-products", { searchResults });
});

module.exports = router;


