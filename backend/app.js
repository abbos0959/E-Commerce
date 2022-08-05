require("dotenv").config();
const express = require("express");
const app = express();
const Cookieparser = require("cookie-parser");
app.use(express.json());
app.use(Cookieparser());

const productRouter = require("./router/productRouter");
const UserRouter = require("./router/userRouter");
const errorController = require("./controller/errorController");
const orderRouter = require("./router/orderRouter");

app.use("/api/v1", productRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", orderRouter);

app.use(errorController);
module.exports = app;
