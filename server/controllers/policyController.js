const Policy = require("../models/Policy");

exports.buyPolicy = async (req, res) => {

  const policy = new Policy({
    userId: req.user.id,
    weeklyPremium: req.body.weeklyPremium,
    coverageAmount: req.body.coverageAmount
  });

  await policy.save();

  res.json({ message: "Policy purchased", policy });
};

exports.getPolicies = async (req, res) => {

  const policies = await Policy.find({ userId: req.user.id });

  res.json(policies);
};