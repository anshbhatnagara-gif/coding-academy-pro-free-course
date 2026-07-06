import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173'] : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'CodeNest Backend is running ✅', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/owner', ownerRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// Start Server
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 CodeNest Backend running on http://localhost:${PORT}`);
    console.log(`📋 Owner Email: ${process.env.OWNER_EMAIL}`);
  });
};

start();
