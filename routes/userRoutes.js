const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler"); // Import the validateToken middleware

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Apply the validateToken middleware to protect the /current route
router.route("/current").get(validateToken, currentUser);

module.exports = router;
