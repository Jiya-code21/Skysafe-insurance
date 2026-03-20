const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res) => {

  const { name, email, password, location } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = new User({
    name,
    email,
    password: hashedPassword,
    location,
    role: "admin"
  });

  await adminUser.save();

  res.json({
    message: "Admin created",
    admin: {
      id: adminUser._id,
      email: adminUser.email,
      role: adminUser.role
    }
  });
};