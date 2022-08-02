const express = require("express");
const router = express.Router();
const { Isauthentication, authoriseRoles } = require("../middleware/isAuthentication");

const UserController = require("../controller/userController");
router.route("/register").post(UserController.registerUser);
router.route("/login").post(UserController.Login);
router.route("/logout").get(UserController.Logout);
router.route("/password/forgot").post(UserController.ForgotPassword);
router.route("/password/reset/:token").patch(UserController.resetPassword);
router.route("/me").get(Isauthentication, UserController.getUserDetails);
router.route("/me/update").patch(Isauthentication, UserController.UpdateProfile);
router.route("/password/update").patch(Isauthentication, UserController.updatePassword);

router
   .route("/admin/users")
   .get(Isauthentication, authoriseRoles("admin"), UserController.getAllUser);
router
   .route("/admin/user/:id")
   .get(Isauthentication, authoriseRoles("admin"), UserController.getSingleUser)
   .patch(Isauthentication, authoriseRoles("admin"), UserController.UpdateUserRole)
   .delete(Isauthentication, authoriseRoles("admin"), UserController.deleteUser);

module.exports = router;
