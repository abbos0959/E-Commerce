const mongoose = require("mongoose");

const DB = async (req, res) => {
   try {
      await mongoose.connect(process.env.DB);
      console.log("mongodb ulandi");
   } catch (error) {
      console.log("mongodb ulanmadi");
   }
};
module.exports = DB;
