import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

// Define and export our custom Request interface.
// This extends the default Express Request to include an optional 'user' property.
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
    role: Role;
  };
}


export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // 1. Check for the Authorization header and ensure it is a Bearer token.
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided.',
      errors: ['An authentication token is required to access this resource.'],
    });
  }

 
  const token = authHeader.split(' ')[1];

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      username: string;
      role: Role;
    };

    
    req.user = decodedPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired token.',
      errors: ['The provided token is not valid.'],
    });
  }
};


export const authorize = (requiredRole: Role) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      
      return res.status(401).json({
        success: false,
        message: 'Unauthorized.',
        errors: ['User is not authenticated.'],
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have the necessary permissions.',
        errors: [`Access denied. This resource requires the '${requiredRole}' role.`],
      });
    }

   
    next();
  };
};