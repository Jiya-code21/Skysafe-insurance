const express = require("express");
const router = express.Router();
const { checkRain } = require("../controllers/weatherController");

router.get("/:city", checkRain);

module.exports = router;