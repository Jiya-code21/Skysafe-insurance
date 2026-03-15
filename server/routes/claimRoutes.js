const express = require("express");
const router = express.Router();

const { createClaim } = require("../controllers/claimController");

router.post("/create", createClaim);

module.exports = router;