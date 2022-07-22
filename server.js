const app=require("./app")
require("dotenv").config()
const DB=require("./connect/db")
DB()





app.listen(process.env.PORT,()=>{console.log(`server ishladi ${process.env.PORT}`);})

//We98YL3QLf4GgUFt