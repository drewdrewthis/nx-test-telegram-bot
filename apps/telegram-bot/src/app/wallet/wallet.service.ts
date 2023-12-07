import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { Prisma } from '@prisma/client';
import { generatePrivateKey } from 'viem/accounts';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  private create(data: Prisma.WalletCreateInput) {
    return this.walletRepository.create(data);
  }

  createForTelegramUser(id: string) {
    const privateKey: string = generatePrivateKey();

    return this.create({
      privateKey,
      TelegramUser: {
        connect: {
          id,
        },
      },
    });
  }
}
