import dotenv from 'dotenv';
// This MUST be the first line to ensure environment variables are loaded
dotenv.config();

import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit'; 
import allRoutes from './api/routes/index'; 

const app = express();
const PORT = process.env.PORT || 3000;

// --- RATE LIMITER MIDDLEWARE CONFIGURATION ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
  
  //  message to send when the rate limit is exceeded
  message: {
    success: false,
    message: 'Too many requests created from this IP, please try again after 15 minutes',
    errors: ['Too many requests.'],
  },
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Main route for the entire API
app.use('/api', allRoutes);

// A simple health-check endpoint to see if the server is running
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is healthy!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});