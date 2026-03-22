// const express = require("express");
// const router = express.Router();

// const {
//   register,
//   login,
//   forgotPassword,
//   verifyOtp,
//   resetPassword,
//   getMe,
//   changePassword,
//   updateProfile
// } = require("../controllers/authController.js");

// const auth = require("../middleware/authMiddleware");

// // ✅ Public
// router.post("/register", register);
// router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/verify-otp", verifyOtp);
// router.post("/reset-password", resetPassword);

// // ✅ Protected
// router.get("/me", auth,getMe);
// router.patch("/change-password", auth, changePassword);
// router.patch("/update-profile", auth, updateProfile);

// module.exports = router;
const express = require("express");
const router  = express.Router();
const auth    = require("../middleware/authMiddleware");
const {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getMe,
  changePassword,
  updateProfile
} = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

router.get("/me", auth, getMe);
router.patch("/change-password", auth, changePassword);
router.patch("/update-profile", auth, updateProfile);

module.exports = router;
