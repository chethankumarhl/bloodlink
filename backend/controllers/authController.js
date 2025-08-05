import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};
//register user
// @desc    Register a new user
// @route   POST /api/users/register
export const registerUser = async (req, res) => {
  const { name, email, password, bloodGroup,city,contactNumber,location } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      bloodGroup,
      city,
      contactNumber,
      location,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bloodGroup: user.bloodGroup,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// @desc    Login user and set cookie
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    // ✅ Production-ready cookie settings
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/' // Available on all paths
    };

    console.log('🍪 Setting cookie with options:', cookieOptions);
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('🔗 Request Origin:', req.get('Origin'));

    res.cookie("jwt", token, cookieOptions);

    // ✅ Send token in response AND set cookie (belt and suspenders approach)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token, // ✅ Include token in response for header auth
      message: 'Login successful'
    });
    
    console.log('✅ Login successful for user:', user.email);
  } else {
    console.log('❌ Login failed for email:', email);
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
   res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: None, // or 'None' if cross-origin and HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
  generateToken(res, user._id);

  res.status(200).json({
    message: 'Logged in successfully',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});