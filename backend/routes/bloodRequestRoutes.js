import express from 'express';
const router = express.Router();
import {
  createBloodRequest,
  getAllBloodRequests,
  getMyRequests,
  updateRequestStatus,
  CompleteMyRequests,
} from '../controllers/bloodRequestController.js';
import { protect } from '../middleware/authMiddleware.js';

// ✅ Import the model
import BloodRequest from '../models/BloodRequest.js';

router.post('/', protect, createBloodRequest);           // Create new request
router.get('/', getAllBloodRequests);                    // All requests (public)
router.get('/my', protect, getMyRequests);               // Get current user's requests
router.put('/:id/status', protect, updateRequestStatus); // Update status
router.get('/myrequests/:userId', protect, getMyRequests);
router.put('/myrequests/:userId/complete/:id', protect, CompleteMyRequests)
router.patch('/:id/donate', protect, async (req, res) => {
  const { id } = req.params;
  const { userName } = req.body;
 const userId = String(req.body.userId); // Get userId from request body

  console.log("Received donation request for ID:", id);
  console.log("User name:", userName);
  console.log("User id:", userId);
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      id,
      {
        donatedBy: userName,
        status: "donating",
        donatedById: userId, // ✅ Set new status
      },
      { new: true }
    ).populate('user', 'name');

    res.json(request);
  } catch (error) {
    console.error("Error updating donation status:", error);
    res.status(500).json({ error: 'Failed to update donation status' });
  }
});


export default router;
