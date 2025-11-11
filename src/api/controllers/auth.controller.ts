import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../domain/usecases/auth/register.usecase';
import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginUserUseCase } from '../../domain/usecases/auth/login.usecase';

// Instantiate the repositories and use cases
const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserUseCase.execute(email, password);

  
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      object: { token },
      errors: null,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: (error as Error).message,
      object: null,
      errors: [(error as Error).message],
    });
  }
};
