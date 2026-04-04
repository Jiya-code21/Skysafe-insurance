const User         = require("../models/User");
const Subscription = require("../models/Subscription");
const Claim        = require("../models/Claim");
const Policy       = require("../models/Policy");
const bcrypt       = require("bcryptjs");
const jwt          = require("jsonwebtoken");

// ── CREATE ADMIN ─────────────────────────────────────────
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 12);
    const admin  = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      role: "admin",
      isActive: true
    });

    res.status(201).json({
      message: "Admin created",
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── ADMIN LOGIN ───────────────────────────────────────────
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase(), role: "admin" }).select("+password");
    if (!user || !user.isActive)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Admin login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── DASHBOARD STATS ───────────────────────────────────────
exports.getDashboard = async (req, res) => {
  try {
    const [totalUsers, activeUsers, totalClaims, pendingClaims, approvedClaims, totalSubs, activeSubs] =
      await Promise.all([
        User.countDocuments({ role: "user" }),
        User.countDocuments({ role: "user", isActive: true }),
        Claim.countDocuments(),
        Claim.countDocuments({ status: "pending" }),
        Claim.countDocuments({ status: "approved" }),
        Subscription.countDocuments(),
        Subscription.countDocuments({ status: "active" }),
      ]);

    const payoutAgg = await Claim.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, total: { $sum: "$claimAmount" } } }
    ]);
    const totalPayout = payoutAgg[0]?.total || 0;

    const revenueAgg = await Subscription.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: null, total: { $sum: "$amountPaid" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    const recentUsers = await User.find({ role: "user" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email isActive createdAt");

    const recentClaims = await Claim.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .populate({
        path: "subscription",
        populate: { path: "policy", select: "title" }
      })
      .select("triggerType claimAmount status createdAt user");

    res.json({
      stats: {
        totalUsers, activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        totalClaims, pendingClaims, approvedClaims,
        totalSubs, activeSubs,
        totalPayout, totalRevenue
      },
      recentUsers,
      recentClaims
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── GET ALL USERS ─────────────────────────────────────────
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .sort({ createdAt: -1 })
      .select("-password");

    const usersWithStats = await Promise.all(
      users.map(async (u) => {
        const subCount   = await Subscription.countDocuments({ user: u._id });
        const claimCount = await Claim.countDocuments({ user: u._id });
        return { ...u.toObject(), subCount, claimCount };
      })
    );

    res.json({ count: users.length, users: usersWithStats });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── ACTIVATE / DEACTIVATE USER ────────────────────────────
exports.deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(400).json({ message: "Cannot deactivate admin" });

    user.isActive = false;
    await user.save();
    res.json({ message: "User deactivated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = true;
    await user.save();
    res.json({ message: "User activated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ── GET ALL CLAIMS ────────────────────────────────────────
exports.getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate({
        path: "subscription",
        populate: { path: "policy", select: "title planType coverageAmount" }
      });

    res.json({ count: claims.length, claims });
  } catch (err) {
    console.error("Get claims error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── UPDATE CLAIM STATUS ───────────────────────────────────
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status, adminNote: adminNote || "" },
      { new: true }
    );
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    res.json({ message: "Claim updated", claim });
  } catch (err) {
    console.error("Update claim error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── GET ALL POLICIES ──────────────────────────────────────
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    res.json({ count: policies.length, policies });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};