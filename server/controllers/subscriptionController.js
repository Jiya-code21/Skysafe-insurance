const Subscription = require("../models/Subscription");
const Policy = require("../models/Policy");

// ================= BUY SUBSCRIPTION (Mock Payment) =================
exports.buySubscription = async (req, res) => {
  try {
    const { policyId } = req.body;

    if (!policyId) {
      return res.status(400).json({ message: "Policy ID is required" });
    }


    const policy = await Policy.findById(policyId);
    if (!policy || !policy.isActive) {
      return res.status(404).json({ message: "Policy not found or inactive" });
    }

   
    const existing = await Subscription.findOne({
      user: req.user._id,
      policy: policyId,
      status: "active"
    });

    if (existing) {
      return res.status(400).json({ message: "You already have an active subscription for this policy" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + policy.duration);

    const subscription = new Subscription({
      user: req.user._id,
      policy: policyId,
      startDate,
      endDate,
      amountPaid: policy.price,
      status: "active",
      paymentId: "mock_pay_" + Date.now()  
    });

    await subscription.save();

    // Populate karke response bhejo
    await subscription.populate("policy", "title price duration coverageAmount planType");

    res.status(201).json({
      message: "Subscription purchased successfully",
      subscription
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid policy ID" });
    }
    console.error("Buy subscription error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET MY SUBSCRIPTIONS =================
exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id })
      .populate("policy", "title price duration coverageAmount planType")
      .sort({ createdAt: -1 });

    res.json({
      message: "Subscriptions fetched",
      count: subscriptions.length,
      subscriptions
    });

  } catch (error) {
    console.error("Get subscriptions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET SINGLE SUBSCRIPTION =================
exports.getSingleSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate("policy", "title price duration coverageAmount planType")
      .populate("user", "name email");

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    
    if (
      subscription.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      message: "Subscription fetched",
      subscription
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid subscription ID" });
    }
    console.error("Get subscription error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= CANCEL SUBSCRIPTION =================
exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }


    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (subscription.status === "cancelled") {
      return res.status(400).json({ message: "Subscription already cancelled" });
    }

    if (subscription.status === "expired") {
      return res.status(400).json({ message: "Cannot cancel an expired subscription" });
    }

    subscription.status = "cancelled";
    await subscription.save();

    res.json({ message: "Subscription cancelled successfully" });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid subscription ID" });
    }
    console.error("Cancel subscription error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ADMIN — GET ALL SUBSCRIPTIONS =================
exports.adminGetAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user", "name email")
      .populate("policy", "title price planType")
      .sort({ createdAt: -1 });

    res.json({
      message: "All subscriptions fetched",
      count: subscriptions.length,
      subscriptions
    });

  } catch (error) {
    console.error("Admin get subscriptions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};