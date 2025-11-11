import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import bcrypt from 'bcryptjs';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: any): Promise<Omit<User, 'password'>> {
    const { username, email, password } = userData;

    const existingUserByEmail = await this.userRepository.findByEmail(email);
    if (existingUserByEmail) {
      throw new Error('This email address is already registered.');
    }

   
    const existingUserByUsername =
      await this.userRepository.findByUsername(username);
    if (existingUserByUsername) {
      throw new Error('This username is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}