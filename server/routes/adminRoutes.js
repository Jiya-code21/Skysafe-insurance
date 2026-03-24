const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createAdmin,
  adminLogin,
  getAllUsers,
  deactivateUser,
  getDashboard
} = require("../controllers/adminController");


const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Public admin routes
router.post("/register", createAdmin);
router.post("/login", adminLogin);

//Protected — only admin
router.get("/users", auth, adminOnly, getAllUsers);
router.patch("/users/:id/deactivate", auth, adminOnly, deactivateUser);
router.get("/dashboard", auth, adminOnly, getDashboard);

module.exports = router;
