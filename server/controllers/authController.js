const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

  const { name, email, password, location } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    location
  });

  await user.save();

  res.json({
    message: "User registered",
    user
  });
};

exports.login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({
    message: "Login successful",
    token
  });
};