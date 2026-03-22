const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true
    },
    triggerType: {
      type: String,
      enum: ["rain", "aqi", "heat", "curfew", "flood"],
      required: [true, "Trigger type is required"]
    },
    triggerValue: {
      type: String,
      required: true
    },
    claimAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    adminNote: {
      type: String, 
      default: ""
    },
  
    payoutId: {
      type: String,
      default: null
    },
    payoutDate: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);
