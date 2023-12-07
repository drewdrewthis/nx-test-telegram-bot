import { PrismaService } from '../prisma/prisma.service';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [WalletService, WalletRepository, PrismaService],
  exports: [WalletService],
})
export class WalletModule {}
