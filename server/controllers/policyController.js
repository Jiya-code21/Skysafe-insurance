// const Policy = require("../models/Policy");

// exports.buyPolicy = async (req, res) => {

//   const policy = new Policy({
//     userId: req.user.id,
//     weeklyPremium: req.body.weeklyPremium,
//     coverageAmount: req.body.coverageAmount
//   });

//   await policy.save();

//   res.json({ message: "Policy purchased", policy });
// };

// exports.getPolicies = async (req, res) => {

//   const policies = await Policy.find({ userId: req.user.id });

//   res.json(policies);
// };

const Policy = require("../models/Policy");

exports.buyPolicy = async (req, res) => {
  try {
    const { weeklyPremium, coverageAmount } = req.body;

    if (!weeklyPremium || !coverageAmount) {
      return res.status(400).json({ message: "weeklyPremium and coverageAmount are required" });
    }

    const policy = new Policy({
      userId:         req.user._id,   // FIX: was req.user.id — use ._id for mongoose docs
      weeklyPremium,
      coverageAmount,
    });

    await policy.save();
    res.status(201).json({ message: "Policy purchased", policy });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
