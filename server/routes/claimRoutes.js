const express = require("express");
const router = express.Router();

const {
  createClaim,
  getClaims,
  updateClaimStatus,
  deleteClaim
} = require("../controllers/claimController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ==============================
// USER ROUTES
// ==============================
router.post("/", auth, createClaim);
router.get("/", auth, getClaims);
router.delete("/:id", auth, deleteClaim);

// ==============================
// ADMIN ROUTES
// ==============================
router.patch("/:id/status", auth, admin, updateClaimStatus);

module.exports = router;