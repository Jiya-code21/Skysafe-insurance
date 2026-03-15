const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({

  userId: String,

  weeklyPremium: Number,

  coverageAmount: Number,

  status: String

});

module.exports = mongoose.model("Policy", policySchema);