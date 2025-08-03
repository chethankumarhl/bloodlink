import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema({
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'donating', 'completed'], default: 'pending' },
  donatedBy: {
  type: String,
  default: null,
},donatedById: {
  type: String,
  default: " ",
},
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

export default BloodRequest;
