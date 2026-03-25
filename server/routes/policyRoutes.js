const express = require("express");
const router = express.Router();

const {
  getAllPolicies,
  getSinglePolicy,
  createPolicy,
  updatePolicy,
  deactivatePolicy,
  adminGetAllPolicies
} = require("../controllers/policyController");

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", getAllPolicies);
router.get("/admin/all", auth, adminOnly, adminGetAllPolicies);
router.get("/:id", getSinglePolicy);

router.post("/", auth, adminOnly, createPolicy);
router.patch("/:id", auth, adminOnly, updatePolicy);
router.patch("/:id/deactivate", auth, adminOnly, deactivatePolicy);

module.exports = router;
