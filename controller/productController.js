const ProductModel = require("../model/productModel");
const AppError = require("../utils/appError");
const catchErrorAsync = require("../utils/catchUtil");

const ApiFeatures = require("../utils/apiFeatures");

// hamma pproductlarni chiqazish
const getAllProducts = catchErrorAsync(async (req, res) => {
   const resultperpage = 2;
   const features = new ApiFeatures(ProductModel.find(), req.query)
      .search()
      .filter()
      .pagination(resultperpage);
   const data = await features.query;

   res.status(200).json({
      soni: data.length,
      data,
   });
});
//bitta productni id orqali topish

const getProduct = catchErrorAsync(async (req, res, next) => {
   const data = await ProductModel.findById(req.params.id);

   if (!data) {
      return next(new AppError("bunday product mavjud emas", 404));
   }
   res.status(200).json({
      data,
   });
});

//yangi product yaratish admin
const createProduct = catchErrorAsync(async (req, res) => {
   const data = await ProductModel.create(req.body);
   res.status(201).json({
      data,
   });
});
const deleteProduct = catchErrorAsync(async (req, res) => {
   const data = await ProductModel.findByIdAndDelete(req.params.id);
   res.status(200).json({
      message: "product o`chirildi",
   });
});

const UpdateProduct = catchErrorAsync(async (req, res) => {
   const data = await ProductModel.findByIdAndUpdate(req.params.id, req.body);

   res.status(200).json({
      message: "update product",
      data,
   });
});
module.exports = { getAllProducts, getProduct, createProduct, deleteProduct, UpdateProduct };
