const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");
const { Isauthentication, authoriseRoles } = require("../middleware/isAuthentication");

router.route("/order/new").post(Isauthentication, OrderController.newOrder);
router.route("/order/:id").get(Isauthentication,  OrderController.getSingleOrder);
router.route("/orders/me").get(Isauthentication, OrderController.meOrder);

module.exports = router;
