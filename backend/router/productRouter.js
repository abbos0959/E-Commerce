const express=require("express")
const router=express.Router()
const Products=require("../controller/productController")
router.route("/products").get(Products.getAllProducts).post(Products.createProduct)
router.route("/products/:id").get(Products.getProduct)
router.route("/products/:id").delete(Products.deleteProduct).patch(Products.UpdateProduct)

module.exports=router