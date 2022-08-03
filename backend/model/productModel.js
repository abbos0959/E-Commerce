const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Iltimos product kiriting"],
      trim: true,
   },
   description: {
      type: String,
      required: [true, "Iltimos description Kiriting"],
   },
   price: {
      type: Number,
      required: [true, "Iltimos Price Kiriting"],
      maxLength: [8, "pricening maximal uzunligi 8 belgidan iborat"],
   },
   ratings: {
      type: Number,
      default: 0,
   },
   images: [
      {
         public_id: {
            type: String,
            required: true,
         },
         url: {
            type: String,
            required: true,
         },
      },
   ],
   category: {
      type: String,
      required: [true, "siz kategoriya kiriting"],
   },
   stock: {
      type: Number,
      required: [true, "Iltimos product stock kiriting"],
      maxLength: [4, "stock maximal 4 belgidan iborat"],
      default: 1,
   },
   numOfReviews: {
      type: Number,
      default: 0,
   },
   reviews: [
      {
         user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
         },
         name: {
            type: String,
            required: true,
         },
         rating: {
            type: Number,
            required: true,
         },
         comment: {
            type: String,
            required: true,
         },
      },
   ],

   user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
   },

   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Product", productSchema);
