const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },
    duration: {
      type: Number,        
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 day"]
    },
    coverageAmount: {
      type: Number,       
      required: [true, "Coverage amount is required"]
    },
    planType: {
      type: String,
      enum: ["basic", "standard", "pro"],
      required: [true, "Plan type is required"]
    },
    triggerTypes: {
      type: [String],    
      default: ["rain", "aqi", "heat", "curfew", "flood"]
    },
    isActive: {
      type: Boolean,
      default: true    
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);
