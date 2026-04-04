const User = require("../models/User");
const PendingUser = require("../models/Pendinguser.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTPEmail, sendWelcomeEmail, sendForgotPasswordEmail } = require("../services/emailService.js");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const realUserExist = await User.findOne({ email: email.toLowerCase() });
    if (realUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await PendingUser.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashed,
        otp: otp,
        otpExpire: Date.now() + 10 * 60 * 1000 // ✅ 10 minutes
      },
      { upsert: true, new: true }
    );

    await sendOTPEmail(email.toLowerCase(), name.trim(), otp);

    res.status(201).json({
      message: "OTP sent to your email. Please verify to complete registration."
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= VERIFY OTP (Register wala) =================
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const pendingUser = await PendingUser.findOne({ email: email.toLowerCase() })
      .select("+password +otp +otpExpire");

    if (!pendingUser) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (pendingUser.otp !== otp || pendingUser.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      role: "user",
      isActive: true
    });

    await user.save();

    await PendingUser.findOneAndDelete({ email: email.toLowerCase() });

    await sendWelcomeEmail(user.email, user.name);

    res.json({ message: "Account verified successfully. You can now login." });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= RESEND OTP =================
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const pendingUser = await PendingUser.findOne({ email: email.toLowerCase() })
      .select("+otp +otpExpire");

    if (!pendingUser) {
      return res.status(404).json({ message: "No pending registration found for this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    pendingUser.otp = otp;
    pendingUser.otpExpire = Date.now() + 10 * 60 * 1000; // ✅ 10 minutes
    await pendingUser.save();

    await sendOTPEmail(email.toLowerCase(), pendingUser.name, otp);

    res.json({ message: "OTP resent successfully to your email." });

  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      const isPending = await PendingUser.findOne({ email: email.toLowerCase() });
      if (isPending) {
        return res.status(403).json({ message: "Please verify your OTP first" });
      }
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Your account has been deactivated" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.json({ message: "If this email exists, OTP has been sent" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000; // ✅ 10 minutes
    await user.save();

    await sendForgotPasswordEmail(email.toLowerCase(), user.name, otp);

    res.json({
      message: "If this email exists, OTP has been sent"
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= VERIFY FORGOT PASSWORD OTP =================
exports.verifyForgotOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() })
      .select("+otp +otpExpire");

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified. You can now reset your password." });

  } catch (error) {
    console.error("Verify forgot OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email: email.toLowerCase() })
      .select("+otp +otpExpire");

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful. You can now login." });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ME =================
exports.getMe = async (req, res) => {
  try {
    res.json({ message: "User fetched successfully", user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old and new password required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.toLowerCase().trim();

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ message: "Profile updated successfully", user: updated });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};