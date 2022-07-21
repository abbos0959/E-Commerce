require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const productRouter = require("./router/productRouter");
const errorController=require("./controller/errorController")

app.use("/api/v1", productRouter);


app.use(errorController)
module.exports = app;
