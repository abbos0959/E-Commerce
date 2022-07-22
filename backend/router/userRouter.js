const express=require("express")
const router=express.Router()

const UserController=require("../controller/userController")
router.route("/register").post(UserController.registerUser)

module.exports=router