const Claim = require("../models/Claim");

exports.createClaim = async (req, res) => {

  const claim = new Claim(req.body);

  await claim.save();

  res.json({
    message: "Claim created",
    claim
  });

};