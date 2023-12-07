import { Module } from '@nestjs/common';
import { TelegramUserService } from './telegram-user.service';
import { TelegramUserRepository } from './telegram-user.repository';
import { WalletModule } from '../wallet/wallet.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [WalletModule],
  providers: [TelegramUserService, TelegramUserRepository, PrismaService],
  exports: [TelegramUserService],
})
export class TelegramUserModule {}
