const express = require("express");
const { register, login, getProfile, toggleFavorite } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { rateLimit } = require("express-rate-limit");

const router = express.Router();
const authAttemptLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 20,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message: { message: "Too many account attempts. Try again shortly." }
});

router.post("/register", authAttemptLimiter, register);
router.post("/login", authAttemptLimiter, login);
router.get("/me", protect, getProfile);
router.post("/favorites", protect, toggleFavorite);

module.exports = router;
