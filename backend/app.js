require("dotenv").config()
const express=require("express")
const app =express()
app.use(express.json())
const productRouter=require("./router/productRouter")


app.use("/api/v1",productRouter)



module.exports=app