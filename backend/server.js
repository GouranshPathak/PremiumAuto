const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Import routes
const testDriveRoutes = require('./routes/testDrive');
const bookingRoutes = require('./routes/booking');

// Debug: show which Mongo URI is being used
console.log('*** Loaded MONGODB_URI =', process.env.MONGODB_URI);

// CORS configuration (needs to run before other middleware)
const rawOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:8080',
  ...rawOrigins
]);

const vercelPreviewRegex = /^https:\/\/premium-auto-[a-z0-9-]+\.vercel\.app$/i;

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin) || vercelPreviewRegex.test(origin)) {
      return callback(null, true);
    }
    console.warn('CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

console.log('*** Allowed CORS origins:', Array.from(allowedOrigins));

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vehicleShowroom';

if (!process.env.MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI missing in .env, falling back to local MongoDB instance');
}

console.log('*** Connecting to Mongo URI:', MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });


// Routes
app.use('/api/test-drive', testDriveRoutes);
app.use('/api/booking', bookingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Vehicle Showroom API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    status: 'error',
    message: error.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
