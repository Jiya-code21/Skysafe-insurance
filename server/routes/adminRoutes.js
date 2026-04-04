const express  = require("express");
const router   = express.Router();
const auth     = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createAdmin, adminLogin,
  getDashboard,
  getAllUsers, deactivateUser, activateUser,
  getAllClaims, updateClaimStatus,
  getAllPolicies
} = require("../controllers/adminController");

// Public
router.post("/register", createAdmin);
router.post("/login",    adminLogin);

// Protected — admin only
router.get  ("/dashboard",              auth, adminOnly, getDashboard);
router.get  ("/users",                  auth, adminOnly, getAllUsers);
router.patch("/users/:id/deactivate",   auth, adminOnly, deactivateUser);
router.patch("/users/:id/activate",     auth, adminOnly, activateUser);
router.get  ("/claims",                 auth, adminOnly, getAllClaims);
router.patch("/claims/:id/status",      auth, adminOnly, updateClaimStatus);
router.get  ("/policies",               auth, adminOnly, getAllPolicies);

module.exports = router;