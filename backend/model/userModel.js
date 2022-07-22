const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Iltimos ismingizni kiriting"],
      maxLength: [30, "Ism maximal 30 belgidan iborat bo`lish kerak"],
      minLength: [4, "Ism minimal 4 belgidan iborat bo`lishi kerak"],
      trim: true,
   },
   email: {
      type: String,
      required: [true, "Iltimos email kiriting"],
      unique: true,
      validate: [validator.isEmail, "Iltimos to`g`ri email kiriting"],
   },
   password: {
      type: String,
      required: [true, "Iltimos Parol kiriting"],
      minLength: [5, "parolni minimal uzunligi 5 ta belgidan iborat"],
   },
   avatar: {
      public_id: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
   },
   role: {
      type: String,
      default: "user",
   },
   resetPasswordToken: String,
   resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("user", userSchema);

