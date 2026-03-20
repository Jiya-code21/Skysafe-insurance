const express = require("express");
const router = express.Router();

const { buyPolicy, getPolicies } = require("../controllers/policyController");
const auth = require("../middleware/authMiddleware");

router.post("/buy", auth, buyPolicy);
router.get("/", auth, getPolicies);

module.exports = router;