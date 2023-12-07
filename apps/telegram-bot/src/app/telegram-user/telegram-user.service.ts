import { Injectable } from '@nestjs/common';
import { TelegramUserRepository } from './telegram-user.repository';
import { Prisma } from '@prisma/client';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class TelegramUserService {
  constructor(
    private telegramUserRepository: TelegramUserRepository,
    private walletService: WalletService
  ) {}

  async create(data: Prisma.TelegramUserCreateInput) {
    const user = await this.telegramUserRepository.create(data);
    // We require a wallet for each user
    await this.walletService.createForTelegramUser(user.id);
    // Return with the wallet
    return this.telegramUserRepository.findOne({
      id: user.id,
    });
  }
}
