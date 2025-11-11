
import { Prisma, PrismaClient, User } from '@prisma/client';

type UserCreateInput = Prisma.UserCreateInput;

const prisma = new PrismaClient();

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