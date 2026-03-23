const Claim = require("../models/Claim");
const Subscription = require("../models/Subscription");

// ================= CREATE CLAIM =================
exports.createClaim = async (req, res) => {
  try {
    const { subscriptionId, triggerType, triggerValue, claimAmount } = req.body;

    if (!subscriptionId || !triggerType || !triggerValue || !claimAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const subscription = await Subscription.findById(subscriptionId)
      .populate("policy");

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (subscription.status !== "active") {
      return res.status(400).json({ message: "Subscription is not active" });
    }

    const duplicate = await Claim.findOne({
      subscription: subscriptionId,
      triggerType,
      status: { $in: ["pending", "approved"] }
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Claim already exists for this trigger"
      });
    }

    const maxCoverage = subscription.policy.coverageAmount;

    if (claimAmount > maxCoverage) {
      return res.status(400).json({
        message: `Claim amount cannot exceed coverage limit of ₹${maxCoverage}`
      });
    }

    // ✅ Correct single claim creation
    const claim = new Claim({
      user: req.user._id,
      subscription: subscriptionId,
      triggerType,
      triggerValue,
      claimAmount
    });

    await claim.save();

    res.status(201).json({
      message: "Claim submitted successfully",
      claim
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    console.error("Create claim error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET MY CLAIMS =================
exports.getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id })
      .populate("subscription", "status amountPaid")
      .sort({ createdAt: -1 });

    res.json({
      message: "Claims fetched",
      count: claims.length,
      claims
    });

  } catch (error) {
    console.error("Get claims error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET SINGLE CLAIM =================
exports.getSingleClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate("user", "name email")
      .populate("subscription");

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (
      claim.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ message: "Claim fetched", claim });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid claim ID" });
    }
    console.error("Get single claim error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ADMIN — GET ALL CLAIMS =================
exports.adminGetAllClaims = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const claims = await Claim.find(filter)
      .populate("user", "name email")
      .populate("subscription", "amountPaid status")
      .sort({ createdAt: -1 });

    res.json({
      message: "All claims fetched",
      count: claims.length,
      claims
    });

  } catch (error) {
    console.error("Admin get claims error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ADMIN — UPDATE CLAIM STATUS =================
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be 'approved' or 'rejected'"
      });
    }

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({
        message: "Only pending claims can be updated"
      });
    }

    claim.status = status;
    claim.adminNote = adminNote || "";

    if (status === "approved") {
      claim.payoutId = "mock_payout_" + Date.now();
      claim.payoutDate = new Date();
    }

    await claim.save();

    res.json({
      message: `Claim ${status} successfully`,
      claim
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid claim ID" });
    }
    console.error("Update claim status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
