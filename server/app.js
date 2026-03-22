// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const authRoutes = require("./routes/authRoutes");
// const policyRoutes = require("./routes/policyRoutes");
// const claimRoutes = require("./routes/claimRoutes");

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/policy", policyRoutes);
// app.use("/api/v1/claim", claimRoutes);

// module.exports = app;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const authRoutes         = require("./routes/authRoutes");
const policyRoutes       = require("./routes/policyRoutes");
const claimRoutes        = require("./routes/claimRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const weatherRoutes      = require("./routes/weatherRoutes");
const adminRoutes        = require("./routes/adminRoutes");

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true,
}));
app.use(express.json());

app.use("/api/v1/auth",         authRoutes);
app.use("/api/v1/policies",      policyRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/claims",        claimRoutes);
app.use("/api/v1/weather",      weatherRoutes);
app.use("/api/v1/admin",        adminRoutes);

app.get("/", (req, res) => res.send("SkySafe API Running ✅"));

module.exports = app;
