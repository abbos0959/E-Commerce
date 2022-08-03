const express = require("express");

const router = express.Router();
const Products = require("../controller/productController");
const { Isauthentication, authoriseRoles } = require("../middleware/isAuthentication");

router.route("/products").get(Isauthentication, authoriseRoles("admin"), Products.getAllProducts);

router.route("/product/:id").get(Products.getProduct);
router
   .route("/admin/product")
   .post(Isauthentication, authoriseRoles("admin"), Products.createProduct);
router
   .route("/admin/product/:id")
   .delete(Isauthentication, authoriseRoles("admin"), Products.deleteProduct)
   .patch(Isauthentication, authoriseRoles("admin"), Products.UpdateProduct);

router.route("/review").patch(Isauthentication, Products.createProductReview);
router
   .route("/reviews")
   .get(Products.getProductReviews)
   .delete(Isauthentication, Products.deleteReview);
// router.get("/products",Isauthentication,authoriseRoles("admin"), Products.getAllProducts)

module.exports = router;
