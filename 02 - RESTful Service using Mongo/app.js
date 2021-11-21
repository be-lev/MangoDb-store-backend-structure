global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const productsController = require("./controllers-layer/products-controller");

const server = express(); // Create the entire server.

server.use(express.json()); // Create "body" property from the given JSON.

server.use("/api/products", productsController); // When frontend requesting our server - transfer that request to the controller's router.

server.use("*", (request, response) => {
    response.status(404).send("Route not found");
});

server.listen(3001, () => console.log("Listening..."));
