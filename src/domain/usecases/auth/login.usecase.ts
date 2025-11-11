import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password_from_req: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password_from_req,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

   
    const jwtPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return token;
  }
}