const ProductModel = require("../model/productModel");
const AppError = require("../utils/appError");
const catchErrorAsync = require("../utils/catchUtil");

const ApiFeatures = require("../utils/apiFeatures");

// hamma pproductlarni chiqazish
const getAllProducts = catchErrorAsync(async (req, res) => {
   const resultperpage = 6;
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
   req.body.user = req.user.id;

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

const createProductReview = catchErrorAsync(async (req, res, next) => {
   const { rating, comment, productId } = req.body;
   const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
   };

   const product = await ProductModel.findById(productId);

   const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
   );

   if (isReviewed) {
      product.reviews.forEach((rev) => {
         if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
      });
   } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
   }
   let avg = 0;
   product.reviews.forEach((rev) => {
      avg += rev.rating;
   });
   console.log(avg);

   product.ratings = avg / product.reviews.length;
   console.log(product.ratings);
   await product.save({ validateBeforeSave: false });
   res.status(200).json({
      success: true,
   });
});

// productni hamma reviewlarini olib kelish
const getProductReviews = catchErrorAsync(async (req, res, next) => {
   const product = await ProductModel.findById(req.query.id);

   if (!product) {
      return next(new AppError("bunday product mavjud emas", 404));
   }

   res.status(200).json({
      status: true,
      reviews: product.reviews,
   });
});

//reviewlarni udalit qilish

const deleteReview = catchErrorAsync(async (req, res, next) => {
   const product = await ProductModel.findById(req.query.productId);

   if (!product) {
      return next(new AppError("bunday product mavjud emas", 404));
   }

   const reviews = product.reviews.filter((val) => val._id.toString() !== req.query.id.toString());

   let avg = 0;

   reviews.forEach((val) => (avg += val.rating));
   let ratings = 0;
   if (reviews.length == 0) {
      ratings = 0;
   } else {
      ratings = avg / reviews.length;
   }
   const numOfReviews = reviews.length;

   await ProductModel.findByIdAndUpdate(
      req.query.productId,
      {
         reviews,
         ratings,
         numOfReviews,
      },
      { new: true, runValidators: true, useFindAndModify: false }
   );
   res.status(200).json({
      status: true,
   });
});
module.exports = {
   getAllProducts,
   getProduct,
   createProduct,
   deleteProduct,
   UpdateProduct,
   createProductReview,
   getProductReviews,
   deleteReview,
};
