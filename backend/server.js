import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import bloodRequestRoutes from './routes/bloodRequestRoutes.js';

dotenv.config();
const app = express();

// ✅ FIXED: Proper CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://bloodlink-blush.vercel.app', // ✅ Your Vercel frontend
  'https://bloodlink-2ga0.onrender.com',
  'https://bloodlink-git-main-chethankumarlingaraju-4435s-projects.vercel.app/', 
  'https://bloodlink-chethankumarlingaraju-4435s-projects.vercel.app/',// Replace with your actual frontend domain
  'https://bloodlink-blush.vercel.app/', // Replace with your actual deployed frontend URL
  // Add all your deployed frontend URLs here
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("🌐 Incoming Origin:", origin);
    // Allow requests with no origin (mobile apps, curl, postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS Rejected:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // 🔑 Allow cookies/auth headers
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser()); // 🔑 Parse cookies

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