const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  policyId: String,
  reason: String,
  payout: Number,
  status: {
    type: String,
    default: "PENDING"
  }
});

module.exports = mongoose.model("Claim", claimSchema);