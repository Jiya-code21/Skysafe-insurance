const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  location: { type: String, default: "" },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  otp:       { type: String },
  otpExpire: { type: Date },
}, { timestamps: true });

// FIX: comparePassword method — used in authController.changePassword
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
