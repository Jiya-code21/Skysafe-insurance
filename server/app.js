const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/policies", policyRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/claims", claimRoutes);
app.use("/api/v1/weather", weatherRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/api/v1/health", (req, res) => {
  res.json({ message: "SkySafe API is running" });
});

app.get("/", (req, res) => {
  res.send("SkySafe API Running");
});

module.exports = app;
