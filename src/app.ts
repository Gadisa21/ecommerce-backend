import dotenv from 'dotenv';
// This MUST be the first line to ensure environment variables are loaded
dotenv.config();

import express, { Request, Response } from 'express';
import allRoutes from './api/routes/index'; 

const app = express();
const PORT = process.env.PORT || 3000;

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