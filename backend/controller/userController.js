const User = require("../model/userModel");
const catchErrorAsync = require("../utils/catchUtil");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

//registratsiya qilish

const registerUser = catchErrorAsync(async (req, res, next) => {
   const { name, email, password } = req.body;

//    const HashPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
      name,
      email,
      password,
      avatar: {
         public_id: "id",
         url: "profil image",
      },
   });
   const token=jwt.sign({id:User._id},"secret",{expiresIn:"1d"})

   res.status(200).json({
      user,
      token
   });
});

module.exports = { registerUser };
