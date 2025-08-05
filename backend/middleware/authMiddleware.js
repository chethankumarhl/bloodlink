import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ✅ FIXED: Try multiple token sources
  // 1. Check Authorization header first
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log("Token from Authorization header:", token);
  }
  // 2. If no header token, check cookies
  else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
    console.log("Token from cookie:", token);
  }

  console.log("Final token being used:", token);
  console.log("All cookies:", req.cookies);
  console.log("Authorization header:", req.headers.authorization);

  if (!token) {
    console.log("No token found in cookies or headers");
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // ✅ FIXED: Match the key used in generateToken
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      console.log("User not found for decoded ID:", decoded.id);
      res.status(401);
      throw new Error('User not found');
    }

    console.log("User found and authenticated:", req.user._id);
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

// Admin-only access middleware
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403);
  throw new Error('Not authorized as admin');
};