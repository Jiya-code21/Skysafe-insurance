const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  register,
  login,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
  verifyOtp,
  resendOtp,
  getMe,
  changePassword,
  updateProfile
} = require("../controllers/authController");

// ✅ Public Routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyForgotOtp);
router.post("/reset-password", resetPassword);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

// ✅ Protected Routes
router.get("/me", auth, getMe);
router.patch("/change-password", auth, changePassword);
router.patch("/update-profile", auth, updateProfile);

module.exports = router;