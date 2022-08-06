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
   const orders = await Order.find({ user: req.user._id }).populate({
      path: "orderItems.product",
      select: "name -_id",
   });

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

//orderlarni yangilash
const updateOrder = catchErrorAsync(async (req, res, next) => {
   const order = await Order.findById(req.params.id);

   if (!order) {
      return next(new AppError("bunday Idli mahsulot mavjud emas", 404));
   }
   if (order.orderStatus === "Delivered") {
      return next(new AppError(" bu buyurtma sizga allaqachon yetkazib berilgan", 404));
   }

   order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
   });
   order.orderStatus = req.body.status;
   if (req.body.status == "Delivered") {
      order.deliveredAt = Date.now();
   }
   await order.save({ validateBeforeSave: false });

   res.status(200).json({
      success: true,
   });
});

async function updateStock(id, quantity) {
   const product = await ProductModel.findById(id);
   if (product.stock >= 0) {
      product.stock -= quantity;
   }
   await product.save({ validateBeforeSave: false });
}

//delete order
const deleteOrder = catchErrorAsync(async (req, res, next) => {
   const order = await Order.findById(req.params.id);

   if (!order) {
      return next(new AppError("bunday Idli product mavjud emas", 404));
   }
   await order.remove();
   res.status(200).json({
      status: true,
   });
});
module.exports = { newOrder, getSingleOrder, meOrder, getAllOrders, updateOrder, deleteOrder };
