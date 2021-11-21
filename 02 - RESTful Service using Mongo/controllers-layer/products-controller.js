const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/product");
// const Product = require("../models/product");

const router = express.Router(); // Only the routing mechanism for our controller.

// GET /api/products - get all products:
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// // GET /api/products/7 - get one product with id=7:
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const product = await productsLogic.getOneProductAsync(_id);
        if(!product) {
            response.status(404).send(`id ${_id} not found.`);
            return;
        }
        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST /api/products - add new product:
router.post("/", async (request, response) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await productsLogic.addProductAsync(product);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT /api/products/7 - update full product of id=7:
router.put("/:_id", async (request, response) => {
    try {
        const product = ProductModel(request.body);
        product._id = request.params._id;
        const updatedProduct = await productsLogic.updateProductAsync(product);
        if(!updatedProduct) {
            response.status(404).send(`_id ${product._id} not found.`);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH /api/products/7 - update partial product of id=7:
router.patch("/:_id", async (request, response) => {
    try {
        const product = ProductModel(request.body);
        product._id = request.params._id;
        const updatedProduct = await productsLogic.updateProductAsync(product);
        if(!updatedProduct) {
            response.status(404).send(`_id ${product._id} not found.`);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE /api/products/7 - delete product of id=7:
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await productsLogic.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET /api/products/range/10/20 - get all products by give price range:
router.get("/range/:minPrice/:maxPrice", async (request, response) => {
    try {
        const minPrice = +request.params.minPrice;
        const maxPrice = +request.params.maxPrice;
        const products = await productsLogic.getProductsByPriceRange(minPrice, maxPrice);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/join/products-with-categories", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsIncludingCategoryAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
router.get("/join/categories-with-products", async (request, response) => {
    try {
        const categories = await productsLogic.getAllCategoryIncludingProductsAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router; // Expose only the router.