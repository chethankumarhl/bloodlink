import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import bloodRequestRoutes from './routes/bloodRequestRoutes.js';

dotenv.config();
const app = express();

// ✅ CORS Configuration - IMPORTANT
const allowedOrigins = [process.env.VITE_API_URL]; // your frontend
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // 🔑 Allow cookies/auth headers
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser()); // 🔑 For cookies

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/requests', bloodRequestRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('BloodLink Backend is Running...');
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
