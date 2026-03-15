const Policy = require("../models/Policy");

exports.buyPolicy = async (req, res) => {

  const policy = new Policy(req.body);

  await policy.save();

  res.json({
    message: "Policy purchased",
    policy
  });

};

exports.getPolicies = async (req, res) => {

  const policies = await Policy.find();

  res.json(policies);

};