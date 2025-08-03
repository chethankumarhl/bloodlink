// controllers/bloodRequestController.js
import asyncHandler from 'express-async-handler';
import BloodRequest from '../models/BloodRequest.js';

// @desc Create a new blood request
// @route POST /api/requests
// @access Private
const createBloodRequest = asyncHandler(async (req, res) => {
  const { bloodGroup, unitsRequired, hospitalName, contactNumber, location, urgency } = req.body;

  if (!bloodGroup || !unitsRequired || !hospitalName || !contactNumber || !location) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const bloodRequest = new BloodRequest({
    user: req.user._id,
    bloodGroup,
    unitsRequired,
    hospitalName,
    contactNumber,
    location,
    urgency,
  });

  const createdRequest = await bloodRequest.save();
  res.status(201).json(createdRequest);
});

// @desc Get all blood requests
// @route GET /api/requests
// @access Public
const getAllBloodRequests = asyncHandler(async (req, res) => {
  const requests = await BloodRequest.find()
    .populate('user', 'name email') // Populate requester info
    .populate('donatedById', 'name email bloodGroup location contactNumber') // Populate donor info
    .sort({ createdAt: -1 });
  res.json(requests);
});


// Controller function to complete a user's request
const CompleteMyRequests = async (req, res) => {
  try {
    const { userId, id  } = req.params;
    
    // Verify that the user is authenticated and the userId matches
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    // Check if the authenticated user matches the userId in params
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only complete your own requests'
      });
    }
    
    // Find the request by ID and verify it belongs to the user
    const request = await BloodRequest.findOne({
      _id: id,
      user: userId
    });
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found or you do not have permission to complete this request'
      });
    }
    
    // Check if request is already completed
    if (request.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Request is already completed'
      });
    }
    
    // Update the request status to completed
    const updatedRequest = await BloodRequest.findByIdAndUpdate(
      id,
      { 
        status: 'completed',
        completedAt: new Date() // Optional: add completion timestamp
      },
      { 
        new: true,
        runValidators: true
      }
    ).populate('user', 'name email phone');
    
    res.status(200).json({
      success: true,
      message: 'Request completed successfully',
      data: updatedRequest
    });
    
  } catch (error) {
    console.error('Error completing request:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc Get current user's blood requests
// @route GET /api/requests/my
// @access Private
const getMyRequests = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log("Fetching requests for user ID:", userId);
    // Ensure the user can only access their own requests
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own requests.'
      });
    }
    
    // Find requests for the specific user ID - using your actual DB schema
    const requests = await BloodRequest.find({ user: userId })
      .populate('user', 'name email bloodGroup contactNumber')
      .sort({ createdAt: -1 }); // Most recent first
    
    res.json({
      success: true,
      data: requests,
      count: requests.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching your requests'
    });
  }
});
// @desc Update status of a blood request
// @route PUT /api/requests/:id/status
// @access Private
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const request = await BloodRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error('Blood request not found');
  }

  request.status = status || request.status;

  const updated = await request.save();
  res.json(updated);
});

export {
  createBloodRequest,
  getAllBloodRequests,
  getMyRequests,
  updateRequestStatus,
  CompleteMyRequests,
};
