const mongoose = require("mongoose");

// Creating product schema:
const ProductSchema = mongoose.Schema(
  {
    // we dont specify the _id cause Mongoose adds it for us.
    name: String,
    price: Number,
    stock: Number,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel", // Foreign key to the categories collection
    },
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false }
); // versionKey: false --> dont add __v property to each object

ProductSchema.virtual("category", {
  ref: "CategoryModel", // to which model is it joined
  localField: "categoryId", // Foreign key property
  foreignField: "_id", // Property in categories collection
  justOne: true
});

// Creating product model:
const ProductModel = mongoose.model("ProductModel", ProductSchema, "products"); //(class name, schema, collection)
module.exports = ProductModel;
