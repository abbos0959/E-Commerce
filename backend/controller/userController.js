const User = require("../model/userModel");
const catchErrorAsync = require("../utils/catchUtil");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtToken = require("../utils/jwtToken");

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
   jwtToken(user, 200, res);
});

const Login = catchErrorAsync(async (req, res, next) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return next(new AppError("siz email yoki passwordni kiritmadiz"));
   }

   const user = await User.findOne({ email });

   if (!user) {
      return next(new AppError("bunday user mavjud emas"));
   }

   const comparePassword = await bcrypt.compare(password, user.password);
   if (!comparePassword) {
      return next(new AppError("parol yoki email xato", 401));
   }
   jwtToken(user, 200, res);
});

module.exports = { registerUser, Login };
