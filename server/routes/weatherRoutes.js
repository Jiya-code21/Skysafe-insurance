// const express = require("express");
// const router = express.Router();
// const { checkRain } = require("../controllers/weatherController");

// router.get("/:city", checkRain);

// module.exports = router;
const express = require("express");
const router  = express.Router();
const { checkRain } = require("../controllers/weatherController");

// Public — no auth needed for weather check
router.get("/:city", checkRain);

module.exports = router;
