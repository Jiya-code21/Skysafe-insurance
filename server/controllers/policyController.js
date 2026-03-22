const Policy = require("../models/Policy");

// ================= GET ALL POLICIES (Public) =================
exports.getAllPolicies = async (req, res) => {
  try {
  
    const policies = await Policy.find({ isActive: true });

    res.json({
      message: "Policies fetched successfully",
      count: policies.length,
      policies
    });

  } catch (error) {
    console.error("Get policies error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET SINGLE POLICY (Public) =================
exports.getSinglePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    if (!policy.isActive) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json({
      message: "Policy fetched successfully",
      policy
    });

  } catch (error) {
    // Invalid MongoDB ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid policy ID" });
    }
    console.error("Get single policy error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= CREATE POLICY (Admin only) =================
exports.createPolicy = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      coverageAmount,
      planType,
      triggerTypes
    } = req.body;

    // Required fields check
    if (!title || !description || !price || !duration || !coverageAmount || !planType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const policy = new Policy({
      title,
      description,
      price,
      duration,
      coverageAmount,
      planType,
      triggerTypes
    });

    await policy.save();

    res.status(201).json({
      message: "Policy created successfully",
      policy
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    console.error("Create policy error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE POLICY (Admin only) =================

exports.updatePolicy = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      coverageAmount,
      planType,
      triggerTypes
    } = req.body;

    // Sirf allowed fields update karo
    const updateData = {};
    if (title)          updateData.title = title;
    if (description)    updateData.description = description;
    if (price)          updateData.price = price;
    if (duration)       updateData.duration = duration;
    if (coverageAmount) updateData.coverageAmount = coverageAmount;
    if (planType)       updateData.planType = planType;
    if (triggerTypes)   updateData.triggerTypes = triggerTypes;

    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json({
      message: "Policy updated successfully",
      policy
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid policy ID" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    console.error("Update policy error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DEACTIVATE POLICY (Admin only) =================

exports.deactivatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    if (!policy.isActive) {
      return res.status(400).json({ message: "Policy is already deactivated" });
    }

    policy.isActive = false;
    await policy.save();

    res.json({ message: "Policy deactivated successfully" });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid policy ID" });
    }
    console.error("Deactivate policy error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ALL POLICIES FOR ADMIN =================

exports.adminGetAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();

    res.json({
      message: "All policies fetched",
      count: policies.length,
      policies
    });

  } catch (error) {
    console.error("Admin get policies error:", error);
    res.status(500).json({ message: "Server error" });
  }
};