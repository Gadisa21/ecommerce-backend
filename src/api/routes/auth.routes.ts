import { Router } from 'express';
import { registerUser,loginUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { registerUserSchema,loginUserSchema } from '../../domain/dtos/auth.dto';

const router = Router();

router.post('/register', validate(registerUserSchema), registerUser);
router.post('/login', validate(loginUserSchema), loginUser);

export default router;