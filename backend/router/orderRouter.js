const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");
const { Isauthentication, authoriseRoles } = require("../middleware/isAuthentication");

router.route("/order/new").post(Isauthentication, OrderController.newOrder);

module.exports=router