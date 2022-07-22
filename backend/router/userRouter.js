const express=require("express")
const router=express.Router()

const UserController=require("../controller/userController")
router.route("/register").post(UserController.registerUser)
router.route("/login").post(UserController.Login)
router.route("/logout").get(UserController.Logout)

module.exports=router