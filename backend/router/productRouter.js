const express = require("express");

const router = express.Router();
const Products = require("../controller/productController");
const { Isauthentication, authoriseRoles } = require("../middleware/isAuthentication");

router
   .route("/products")
   .get(Isauthentication,authoriseRoles("admin"), Products.getAllProducts)
   .post(Isauthentication ,authoriseRoles("admin"), Products.createProduct);
router.route("/products/:id").get(Products.getProduct);

router
   .route("/products/:id")
   .delete(Isauthentication ,authoriseRoles("admin"), Products.deleteProduct)
   .patch(Isauthentication ,authoriseRoles("admin"), Products.UpdateProduct);
// router.get("/products",Isauthentication,authoriseRoles("admin"), Products.getAllProducts)

module.exports = router;
