const User = require("../model/userModel");
const catchErrorAsync = require("../utils/catchUtil");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");

//registratsiya qilish

const registerUser = catchErrorAsync(async (req, res, next) => {
   const { name, email, password, role } = req.body;

   //    const HashPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
      role,
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

const Logout = catchErrorAsync(async (req, res) => {
   res.clearCookie("token", null, {
      maxAge: new Date(Date.now()),
      httpOnly: true,
   });
   res.status(200).json({
      message: true,
      message: "Logout User",
   });
});

const ForgotPassword = catchErrorAsync(async (req, res, next) => {
   const user = await User.findOne({ email: req.body.email });
   if (!user) {
      return next(new AppError("bunday user topilmadi", 404));
   }

   //resetToken yaratish
   const resetToken = user.getResetPasswordToken();
   await user.save({ validateBeforeSave: false });

   //url yaratish

   const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
   )}/api/v1/password/reset/${resetToken}`;

   const message = `sizning  parolingiz  tiklash tokeni ${resetPasswordUrl}`;

   try {
      await sendEmail({
         email: user.email,
         subject: "parolingizni tiklash tokeni",
         message,
      });
      res.status(200).json({
         message: "emailga token yuborildi",
      });
   } catch (error) {
      (user.resetPasswordToken = undefined), (user.resetPasswordExpire = undefined);
      await user.save({ validateBeforeSave: false });
      return next(new AppError("token yuborilmadi"));
   }
});
// reset password
const resetPassword = catchErrorAsync(async (req, res, next) => {
   //token olamiz

   const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

   const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
   });
   console.log(user);
   if (!user) {
      return next(new AppError("tokenda hatolik mavjud", 404));
   }
   if (req.body.password !== req.body.confirmPassword) {
      return next(new AppError("parollar bir hil emas", 401));
   }
   user.password = req.body.password;
   user.confirmPassword = req.body.confirmPassword;
   user.resetPasswordExpire = undefined;
   user.resetPasswordToken = undefined;

   await user.save();
   sendToken(user, 200, res);
});

const getUserDetails = catchErrorAsync(async (req, res, next) => {
   const user = await User.findById(req.user.id);
   res.status(200).json({
      message: true,
      user,
   });
});

const updatePassword = catchErrorAsync(async (req, res, next) => {
   const user = await User.findById(req.user.id);

   const comparePassword = await bcrypt.compare(req.body.OldPassword, user.password);
   if (!comparePassword) {
      return next(new AppError("parol yoki email xato", 401));
   }

   if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new AppError("parollar bir biriga teng emas", 400));
   }
   user.password = req.body.newPassword;
   await user.save();
   sendToken(user, 200, res);
});

const UpdateProfile = catchErrorAsync(async (req, res, next) => {
   const Update = {
      name: req.body.name,
      email: req.body.email,
   };
   const user = await User.findByIdAndUpdate(req.user.id, Update, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });
   res.status(200).json({
      status:true
   })
});
module.exports = {
   registerUser,
   Login,
   Logout,
   ForgotPassword,
   resetPassword,
   getUserDetails,
   updatePassword,
   UpdateProfile,
};
