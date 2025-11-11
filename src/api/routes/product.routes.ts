import { Router } from 'express';
import { Role } from '@prisma/client';
import { createProduct } from '../controllers/product.controller';
import { validate } from '../middlewares/validation.middleware';
import { createProductSchema } from '../../domain/dtos/product.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Route: POST /api/products
// This route is protected by a chain of middlewares:
// 1. `authenticate`: Checks for a valid JWT and attaches user to request.
// 2. `authorize(Role.ADMIN)`: Checks if the authenticated user has the 'ADMIN' role.
// 3. `validate(createProductSchema)`: Validates the request body.
// 4. `createProduct`: The controller function that handles the request.
router.post(
  '/',
  authenticate,
  authorize(Role.ADMIN),
  validate(createProductSchema),
  createProduct
);

export default router;