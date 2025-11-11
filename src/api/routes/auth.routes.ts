import { Router } from 'express';
import { registerUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { registerUserSchema } from '../../domain/dtos/auth.dto';

const router = Router();

router.post('/register', validate(registerUserSchema), registerUser);

export default router;