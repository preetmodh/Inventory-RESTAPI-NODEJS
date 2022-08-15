const express = require("express");
const router = express.Router();


const checkAuth = require("../middleware/check-auth");

//Controller for user 
const UserController = require("../controllers/user");

//signup route for new user
router.post("/signup",UserController.user_signup);

//login route for existing user
router.post("/login", UserController.user_login);


//delete route for existing user
router.delete("/:userId",checkAuth, UserController.user_delete);

module.exports = router;