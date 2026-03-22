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
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");
const adminRoutes = require("./routes/adminRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true,
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/policy", policyRoutes);
app.use("/api/v1/claim", claimRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/weather", weatherRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;
