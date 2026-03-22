// const Claim = require("../models/Claim");

// // ==============================
// // CREATE CLAIM
// // ==============================
// exports.createClaim = async (req, res) => {
//   try {
//     const { policyId, reason, payout } = req.body;

//     const claim = new Claim({
//       policyId,
//       reason,
//       payout
//     });

//     await claim.save();

//     res.json({ message: "Claim created", claim });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ==============================
// // GET ALL CLAIMS
// // ==============================
// exports.getClaims = async (req, res) => {
//   try {
//     const claims = await Claim.find();
//     res.json(claims);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ==============================
// // UPDATE CLAIM STATUS (ADMIN)
// // ==============================
// exports.updateClaimStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const claim = await Claim.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!claim) {
//       return res.status(404).json({ message: "Claim not found" });
//     }

//     res.json({ message: "Claim updated", claim });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ==============================
// // DELETE CLAIM ✅ (FIX ADDED)
// // ==============================
// exports.deleteClaim = async (req, res) => {
//   try {
//     const claim = await Claim.findByIdAndDelete(req.params.id);

//     if (!claim) {
//       return res.status(404).json({ message: "Claim not found" });
//     }

//     res.json({ message: "Claim deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Claim  = require("../models/Claim");
const Policy = require("../models/Policy");

// ── CREATE CLAIM ─────────────────────────────────────────────────────────────
exports.createClaim = async (req, res) => {
  try {
    const { policyId, reason, payout } = req.body;

    if (!policyId || !reason || !payout) {
      return res.status(400).json({ message: "policyId, reason and payout are required" });
    }

    // FIX: Verify the policy belongs to the logged-in user
    const policy = await Policy.findOne({ _id: policyId, userId: req.user._id });
    if (!policy) {
      return res.status(404).json({ message: "Policy not found or not yours" });
    }

    const claim = new Claim({ policyId, reason, payout, userId: req.user._id });
    await claim.save();

    res.status(201).json({ message: "Claim created", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET ALL CLAIMS (for logged-in user) ──────────────────────────────────────
exports.getClaims = async (req, res) => {
  try {
    // FIX: Only return claims that belong to the current user
    const claims = await Claim.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── UPDATE CLAIM STATUS (ADMIN) ──────────────────────────────────────────────
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["PENDING", "APPROVED", "REJECTED"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${allowed.join(", ")}` });
    }

    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    res.json({ message: "Claim updated", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── DELETE CLAIM ─────────────────────────────────────────────────────────────
exports.deleteClaim = async (req, res) => {
  try {
    // FIX: Only owner can delete their claim
    const claim = await Claim.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!claim) return res.status(404).json({ message: "Claim not found or not yours" });

    res.json({ message: "Claim deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
