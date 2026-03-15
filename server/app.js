const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const policyRoutes = require("./routes/policyRoutes");
const claimRoutes = require("./routes/claimRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/claim", claimRoutes);

app.get("/", (req, res) => {

  res.send("Skysafe Insurance API running");

});

module.exports = app;