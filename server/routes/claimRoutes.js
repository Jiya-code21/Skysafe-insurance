
const express = require("express");
const router  = express.Router();
const auth    = require("../middleware/authMiddleware");
const {
  createClaim,
  getMyClaims,
  getSingleClaim,
  adminGetAllClaims,
  updateClaimStatus,
  deleteClaim
} = require("../controllers/claimController");

const adminOnly = require("../middleware/adminMiddleware");

//User routes
router.post("/", auth, createClaim);
router.get("/", auth, getMyClaims);
router.get("/admin/all", auth, adminOnly, adminGetAllClaims);
router.get("/:id", auth, getSingleClaim);
router.delete("/:id", auth, deleteClaim);

//  Admin routes
router.patch("/:id/status", auth, adminOnly, updateClaimStatus);

module.exports = router;
