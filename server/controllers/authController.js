const User = require("../models/User");
const PendingUser = require("../models/Pendinguser.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check real users mein
    const realUserExist = await User.findOne({ email: email.toLowerCase() });
    if (realUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Pending user mein save karo ya update karo
    await PendingUser.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashed,
        otp: otp,
        otpExpire: Date.now() + 1.5 * 60 * 1000
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: "OTP sent. Please verify to complete registration.",
      otp  // dev mode — production mein email se bhejenge
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

    // Real User banao
    const user = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      role: "user",
      isActive: true
    });

    await user.save();

    // PendingUser delete karo
    await PendingUser.findOneAndDelete({ email: email.toLowerCase() });

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
    pendingUser.otpExpire = Date.now() + 1.5 * 60 * 1000;
    await pendingUser.save();

    res.json({ message: "OTP resent successfully", otp });

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
        role: user.role,
        location: user.location
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= FORGOT PASSWORD (OTP bhejo) =================
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
    user.otpExpire = Date.now() + 1.5 * 60 * 1000;
    await user.save();

    res.json({
      message: "If this email exists, OTP has been sent",
      otp  // dev mode
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

// ================= RESET PASSWORD (Forgot wala — OTP se) =================
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

// ================= CHANGE PASSWORD (Login hone ke baad) =================
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
    const { name, email, location } = req.body;

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.toLowerCase().trim();
    if (location !== undefined) updateData.location = location.trim();

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
