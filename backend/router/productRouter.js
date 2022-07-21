const express=require("express")
const router=express.Router()
const Products=require("../controller/productController")
router.route("/products").get(Products.getAllProducts)

module.exports=router