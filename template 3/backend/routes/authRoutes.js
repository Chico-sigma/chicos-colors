const express = require("express");
const { register, login, getProfile, toggleFavorite } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.post("/favorites", protect, toggleFavorite);

module.exports = router;
