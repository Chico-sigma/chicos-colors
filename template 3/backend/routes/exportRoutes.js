const express = require("express");
const { exportUsers } = require("../controllers/exportController");
const { protect, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, requireAdmin, exportUsers);

module.exports = router;
