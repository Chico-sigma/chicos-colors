const jwt = require("jsonwebtoken");
const User = require("../models/User");

function getTokenFromRequest(request) {
  const authorization = request.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) return null;
  return authorization.slice(7).trim();
}

async function protect(request, response, next) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return response.status(401).json({ message: "Authentication required." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not configured.");

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return response.status(401).json({ message: "The authenticated user no longer exists." });
    }

    request.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return response.status(401).json({ message: "Invalid or expired token." });
    }
    next(error);
  }
}

function requireAdmin(request, response, next) {
  if (request.user?.role !== "admin") {
    return response.status(403).json({ message: "Administrator access required." });
  }
  next();
}

module.exports = { protect, requireAdmin };
