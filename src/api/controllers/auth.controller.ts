import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../domain/usecases/auth/register.usecase';
import { UserRepository } from '../../domain/repositories/user.repository';

// Instantiate the repository and use case
const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await registerUserUseCase.execute(req.body);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      object: user,
      errors: null,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: (error as Error).message,
      object: null,
      errors: [(error as Error).message],
    });
  }
};