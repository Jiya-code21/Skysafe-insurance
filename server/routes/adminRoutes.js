const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const { createAdmin } = require("../controllers/adminController");

router.post("/create-admin", auth, admin, createAdmin);

module.exports = router;