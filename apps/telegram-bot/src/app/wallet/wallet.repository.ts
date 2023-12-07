import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Wallet, Prisma } from '@prisma/client';

@Injectable()
export class WalletRepository {
  constructor(private prisma: PrismaService) {}

  async create(walletData: Prisma.WalletCreateInput): Promise<Wallet> {
    return this.prisma.wallet.create({
      data: walletData,
    });
  }
}
