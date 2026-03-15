const express = require("express");
const router = express.Router();

const { buyPolicy, getPolicies } = require("../controllers/policyController");

router.post("/buy", buyPolicy);
router.get("/", getPolicies);

module.exports = router;