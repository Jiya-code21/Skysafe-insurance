// const express = require("express");
// const router = express.Router();

// const {
//   createClaim,
//   getClaims,
//   updateClaimStatus,
//   deleteClaim
// } = require("../controllers/claimController");

// const auth = require("../middleware/authMiddleware");
// const admin = require("../middleware/adminMiddleware");

// // ==============================
// // USER ROUTES
// // ==============================
// router.post("/", auth, createClaim);
// router.get("/", auth, getClaims);
// router.delete("/:id", auth, deleteClaim);

// // ==============================
// // ADMIN ROUTES
// // ==============================
// router.patch("/:id/status", auth, admin, updateClaimStatus);

// module.exports = router;
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

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

//User routes
router.post("/", auth, createClaim);
router.get("/", auth, getMyClaims);
router.get("/:id", auth, getSingleClaim);

//  Admin routes
router.get("/admin/all", auth, adminOnly, adminGetAllClaims);
router.patch("/:id/status", auth, adminOnly, updateClaimStatus);

module.exports = router;
