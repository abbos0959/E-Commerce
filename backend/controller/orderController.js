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

const getSingleOrder=catchErrorAsync(async(req,res,next)=>{
   const order=await Order.findById()

})

module.exports = { newOrder,getSingleOrder };
