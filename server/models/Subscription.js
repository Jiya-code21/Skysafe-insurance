const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      required: true     
    },
    amountPaid: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active"
    },
 
    paymentId: {
      type: String,
      default: () => "mock_pay_" + Date.now()
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);