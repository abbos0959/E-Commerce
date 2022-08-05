const Order = require("../model/orderModel");
const ProductModel = require("../model/productModel");
const AppError = require("../utils/appError");
const catchErrorAsync = require("../utils/catchUtil");

//yangi order yaratish
const newOrder = catchErrorAsync(async (req, res, next) => {
   const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
   } = req.body;

   const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
   });
   res.status(201).json({
      status: true,
      order,
   });
});

// bitta orderni olish

const getSingleOrder = catchErrorAsync(async (req, res, next) => {
   const order = await Order.findById(req.params.id).populate({
      path: "user",
      select: "name email ",
   });
   if (!order) {
      return next(new AppError("bunday Idli Order mavjud emas", 404));
   }
   res.status(200).json({
      status: true,
      order,
   });
});

//login qilib kirgan user barcha orderlari
const meOrder = catchErrorAsync(async (req, res, next) => {
   const orders = await Order.find({ user: req.user._id });

   res.status(200).json({
      status: true,
      orders,
   });
});
// hamma orderlarni  ko`rish
const getAllOrders = catchErrorAsync(async (req, res, next) => {
   const orders = await Order.find();

   let totalAmount = 0;
   orders.forEach((val) => {
      totalAmount += val.totalPrice;
   });
   res.status(200).json({
      status: true,
      totalAmount,
      orders,
   });
});

module.exports = { newOrder, getSingleOrder, meOrder, getAllOrders };
