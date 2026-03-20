const Claim = require("../models/Claim");

// ==============================
// CREATE CLAIM
// ==============================
exports.createClaim = async (req, res) => {
  try {
    const { policyId, reason, payout } = req.body;

    const claim = new Claim({
      policyId,
      reason,
      payout
    });

    await claim.save();

    res.json({ message: "Claim created", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// GET ALL CLAIMS
// ==============================
exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// UPDATE CLAIM STATUS (ADMIN)
// ==============================
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.json({ message: "Claim updated", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// DELETE CLAIM ✅ (FIX ADDED)
// ==============================
exports.deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndDelete(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.json({ message: "Claim deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};