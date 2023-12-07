import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramUser, Prisma } from '@prisma/client';

@Injectable()
export class TelegramUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userData: Prisma.TelegramUserCreateInput
  ): Promise<TelegramUser> {
    return this.prisma.telegramUser.create({
      data: userData,
    });
  }

  async findOne(userWhereUniqueInput: Prisma.TelegramUserWhereUniqueInput) {
    return this.prisma.telegramUser.findUnique({
      where: userWhereUniqueInput,
      include: {
        wallets: true,
      },
    });
  }
}
