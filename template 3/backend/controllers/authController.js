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
    const { name, email, password } = request.body || {};
    if (!name || !email || !password) {
      return response.status(400).json({ message: "Name, email, and password are required." });
    }
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return response.status(400).json({ message: "Name, email, and password must be text values." });
    }
    if (name.trim().length < 2 || name.trim().length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return response.status(400).json({ message: "Enter a valid name and email address." });
    }
    if (password.length < 8 || password.length > 128) {
      return response.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return response.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashedPassword });
    response.status(201).json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

async function login(request, response, next) {
  try {
    const { email, password } = request.body || {};
    if (!email || !password) {
      return response.status(400).json({ message: "Email and password are required." });
    }
    if (typeof email !== "string" || typeof password !== "string" || password.length > 128) {
      return response.status(400).json({ message: "Enter a valid email and password." });
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
    const { type, itemId, name, hex, colors } = request.body || {};
    if (!["color", "palette"].includes(type) || !itemId) {
      return response.status(400).json({ message: "Favorite type and itemId are required." });
    }
    if (typeof itemId !== "string" || itemId.length > 120 || (name !== undefined && (typeof name !== "string" || name.length > 120))) {
      return response.status(400).json({ message: "Favorite identifiers and names must be short text values." });
    }
    if (hex && !/^#[0-9a-f]{6}$/i.test(hex)) {
      return response.status(400).json({ message: "Favorite HEX must be a six-digit color value." });
    }
    if (colors !== undefined && (!Array.isArray(colors) || colors.length > 20 || colors.some((color) => typeof color !== "string" || !/^#[0-9a-f]{6}$/i.test(color)))) {
      return response.status(400).json({ message: "Favorite palettes may contain up to 20 valid HEX colors." });
    }

    const favoriteIndex = request.user.favorites.findIndex((favorite) => favorite.type === type && favorite.itemId === itemId);
    if (favoriteIndex >= 0) {
      request.user.favorites.splice(favoriteIndex, 1);
    } else {
      request.user.favorites.push({ type, itemId, name, hex, colors });
    }

    await request.user.save();
    response.json({ added: favoriteIndex < 0, favorites: request.user.favorites });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, getProfile, toggleFavorite };
