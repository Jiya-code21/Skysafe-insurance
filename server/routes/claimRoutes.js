
const express = require("express");
const router  = express.Router();
const auth    = require("../middleware/authMiddleware");
const admin   = require("../middleware/adminMiddleware");
const {
  createClaim,
  getMyClaims,
  getSingleClaim,
  adminGetAllClaims,
  updateClaimStatus
} = require("../controllers/claimController");

const adminOnly = require("../middleware/adminMiddleware");

//User routes
router.post("/", auth, createClaim);
router.get("/", auth, getMyClaims);
router.get("/:id", auth, getSingleClaim);

//  Admin routes
router.get("/admin/all", auth, adminOnly, adminGetAllClaims);
router.patch("/:id/status", auth, adminOnly, updateClaimStatus);

module.exports = router;
