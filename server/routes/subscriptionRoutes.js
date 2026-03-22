const express = require("express");
const router = express.Router();

const {
  buySubscription,
  getMySubscriptions,
  getSingleSubscription,
  cancelSubscription,
  adminGetAllSubscriptions
} = require("../controllers/subscriptionController");

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", auth, buySubscription);
router.get("/", auth, getMySubscriptions);
router.get("/:id", auth, getSingleSubscription);
router.post("/:id/cancel", auth, cancelSubscription);


router.get("/admin/all", auth, adminOnly, adminGetAllSubscriptions);

module.exports = router;