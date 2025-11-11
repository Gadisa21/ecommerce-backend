
import { Prisma, PrismaClient, User } from '@prisma/client';
import prisma from '../../utils/prisma';

type UserCreateInput = Prisma.UserCreateInput;


export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
  }

  async create(userData: UserCreateInput): Promise<User> {
    return prisma.user.create({ data: userData });
  }
}