// models/BloodRequest.js
import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    unitsRequired: {
      type: Number,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ['high', 'normal'],
      default: 'normal',
    },
    status: {
      type: String,
      enum: ['pending', 'donating', 'completed'],
      default: 'pending',
    },
    donatedBy: {
  type: String,
  default: null,
},
donatedById: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: null,
},
  },
  { timestamps: true }
);

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);
export default BloodRequest;
