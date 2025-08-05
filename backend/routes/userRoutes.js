import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import { registerUser, loginUser } from '../controllers/authController.js';
import { getMe,getUserInfo } from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me',protect, getMe);
router.get('/userProfile/:id',getUserInfo); // ✅ Added user profile route
// router.get('/logout', logout);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/update-password', protect, updatePassword);
// 🔐 Admin-only routes
router.get('/', protect, isAdmin, getAllUsers);
router.delete('/:id', protect, isAdmin, deleteUser);
router.get('/test-cors', (req, res) => {
  res.json({ 
    message: 'CORS is working!', 
    origin: req.get('Origin'),
    timestamp: new Date().toISOString()
  });
});
export default router;
