import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createOrderSchema } from '../../domain/dtos/order.dto';
import { createOrder,getOrderHistory } from '../controllers/order.controller';

const router = Router();


router.post(
  '/',
  authenticate,
  authorize(Role.USER), 
  validate(createOrderSchema),
  createOrder
);

router.get('/', authenticate, getOrderHistory);

export default router;