const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  location: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  otp: String,
  otpExpire: Date
});

module.exports = mongoose.model("User", userSchema);