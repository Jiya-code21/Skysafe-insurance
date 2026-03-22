const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  // FIX: was String — should be ObjectId ref for proper queries
  userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weeklyPremium:  { type: Number, required: true },
  coverageAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "EXPIRED"],
    default: "ACTIVE",
  },
}, { timestamps: true });

module.exports = mongoose.model("Policy", policySchema);
