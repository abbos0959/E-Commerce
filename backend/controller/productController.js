const ProductModel = require("../model/productModel");

// hamma pproductlarni chiqazish
const getAllProducts = async (req, res) => {
   const data = await ProductModel.find();

   res.status(200).json({
      data,
      message: "route yaratildi",
   });
};

//bitta productni id orqali topish

const getProduct = async (req, res) => {
   const data = await ProductModel.findById(req.params.id);
   res.status(200).json({
      data,
   });
};

//yangi product yaratish admin
const createProduct = async (req, res) => {
   const data = await ProductModel.create(req.body);
   res.status(201).json({
      data,
   });
};
const deleteProduct = async (req, res) => {
   const data = await ProductModel.findByIdAndDelete(req.params.id);
   res.status(200).json({
      message: "product o`chirildi",
   });
};

const UpdateProduct = async (req, res) => {
   const data = await ProductModel.findByIdAndUpdate(req.params.id, req.body);

   res.status(200).json({
      message: "update product",
      data,
   });
};
module.exports = { getAllProducts, getProduct, createProduct, deleteProduct, UpdateProduct };
