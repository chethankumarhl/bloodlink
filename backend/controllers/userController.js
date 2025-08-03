import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'; // ✅ Importing token utility
import mongoose from 'mongoose';
export const getMe = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
// @desc    Get user profile
// // @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  // Step 1: Get token from cookies
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    // Step 2: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3: Find user by ID (check 'userId' from payload)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Step 4: Return user data
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
    user.location = req.body.location || user.location;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    user.profilePic = req.body.profilePic || user.profilePic;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bloodGroup: updatedUser.bloodGroup,
      location: updatedUser.location,
      contactNumber: updatedUser.contactNumber,
      profilePic: updatedUser.profilePic,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @route PUT /api/users/update-password
// @access Private
export const updatePassword = asyncHandler(async (req, res) => {
  const { email, contactNumber, newPassword } = req.body;

  if (!email || !contactNumber || !newPassword) {
    return res.status(400).json({ message: 'Please provide email, contact number, and new password' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found with this email' });
  }

  if (user.contactNumber !== contactNumber) {
    return res.status(401).json({ message: 'Mobile number does not match' });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.json({ message: 'Password updated successfully' });
});

// DELETE /api/users/:id (admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
// GET /api/users (admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});
// @route   GET /api/users/userProfile/:id
// @access  Private
export const getUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate if id is a valid MongoDB ObjectId using Mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid user ID format');
  }

  // Find user by ID and exclude password and other sensitive fields
  const user = await User.findById(id).select('-password -__v');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Return user data (excluding sensitive information)
  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      bloodGroup: user.bloodGroup,
      location: user.location,
      contactNumber: user.contactNumber,
      profilePic: user.profilePic,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  });
});
