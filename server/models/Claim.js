const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  // FIX: userId added so each claim is linked to its owner
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  policyId: { type: String, required: true },
  reason:   { type: String, required: true },
  payout:   { type: Number, required: true },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
}, { timestamps: true });

module.exports = mongoose.model("Claim", claimSchema);
