const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured.");

  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    favorites: user.favorites,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

async function register(request, response, next) {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({ message: "Name, email, and password are required." });
    }
    if (password.length < 8) {
      return response.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return response.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: normalizedEmail, password: hashedPassword });
    response.status(201).json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

async function login(request, response, next) {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
    const passwordMatches = user && await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    response.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

async function getProfile(request, response) {
  response.json({ user: publicUser(request.user) });
}

async function toggleFavorite(request, response, next) {
  try {
    const { type, itemId, name, hex } = request.body;
    if (!["color", "palette"].includes(type) || !itemId) {
      return response.status(400).json({ message: "Favorite type and itemId are required." });
    }
    if (hex && !/^#[0-9a-f]{6}$/i.test(hex)) {
      return response.status(400).json({ message: "Favorite HEX must be a six-digit color value." });
    }

    const favoriteIndex = request.user.favorites.findIndex((favorite) => favorite.type === type && favorite.itemId === itemId);
    if (favoriteIndex >= 0) {
      request.user.favorites.splice(favoriteIndex, 1);
    } else {
      request.user.favorites.push({ type, itemId, name, hex });
    }

    await request.user.save();
    response.json({ added: favoriteIndex < 0, favorites: request.user.favorites });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, getProfile, toggleFavorite };
