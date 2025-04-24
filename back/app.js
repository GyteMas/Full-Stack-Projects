const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utilities/appError');
const userRouter = require('./routes/userRoutes');
const appointmentRouter = require('./routes/appointmentsRouter');
const adminRouter = require('./routes/adminRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Create server
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Mounting the routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/admin', adminRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
});

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
