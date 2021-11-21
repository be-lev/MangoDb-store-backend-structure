const { response } = require("express");
const dal = require("../data-access-layer/dal");
const ProductModel = require("../models/product");
const CategoryModel = require("../models/category-model")
// Get all products:
//mongodb
// async function getAllProductsAsync() {
//     return new Promise((res,rej)=>{
//         dal.getDatabase().collection("products").find({}).toArray((err,products)=>{
//             if(err){
//                 rej(err)
//                 return;
//             }
//             res(products)
//         })
//     })
// }
//mongoose
function getAllProductsAsync() {
  return ProductModel.find().exec();
}

// Get one product:
function getOneProductAsync(_id) {
  return ProductModel.findById(_id).exec();
}

// Add new product:
async function addProductAsync(product) {

  return ProductModel.save();
}

// Update full product:
async function updateProductAsync(product) {
const info = await ProductModel.updateOne({_id: product._id}, product).exec()
  return info.n ? product : null;   //info.n= number of products found to check the status of updated
}



// Delete product:
 function deleteProduct(_id) {
  return ProductModel.deleteOne({_id}),exec()
}

// Mongo Query Language: 
// $or      OR
// $and     AND
// $gte     Greater Than or Equal
// $lte     Lower Than or Equal
// $gt      Greater Than
// $lt      Lower Than
// $eq      Equal to
// $ne      Not Equal to
// $in      IN
// $nin     NOT IN

function getProductsByPriceAsync(price){
    return ProductModel.find({price}).exec()
}
function getProductsByNameAndPriceAsync(name, price){
    return ProductModel.find({name, price}).exec()
}
function getProductsByNameOrPriceAsync(name, price){
    return ProductModel.find({$or:[{name, price}]}).exec()
}
// Get Products by Price Range
function getProductsByPriceRange(minPrice, maxPrice) {
  return ProductModel.find({price:{$gte: minPrice, $lte: maxPrice}}).exec();
}

function getSortedProductsAsync(){
    return ProductModel.find({}, null, {sort: { price:-1, name: 1}}).exec() // -1= desc, +1 =acc
}

function getPagedProductsAsync(skip, limit){
    return ProductModel.find({}, null, {skip, limit}).exec(); 
}

function getMultipleWordsProductsAsync(){
    return ProductModel.find({name: {$regex: /^.+ .+$/}}).exec();
}

function getAllProductsIncludingCategoryAsync() {
    return ProductModel.find().populate("category").exec(); // category = which virtual field to populate
}
function getAllCategoryIncludingProductsAsync() {
    return CategoryModel.find().populate("products").exec(); // category = which virtual field to populate
}


module.exports = {
  getAllProductsAsync,
  getOneProductAsync,
  addProductAsync,
  updateProductAsync,
  deleteProduct,
  getProductsByPriceAsync,
  getProductsByNameAndPriceAsync,
  getProductsByNameOrPriceAsync,
  getProductsByPriceRange,
  getSortedProductsAsync,
  getPagedProductsAsync,
  getMultipleWordsProductsAsync,
  getAllProductsIncludingCategoryAsync,
  getAllCategoryIncludingProductsAsync

};
