import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TelegramUserService } from '../telegram-user/telegram-user.service';
import { User } from 'telegraf/typings/core/types/typegram';
import { camelcaseKeys } from '../../lib/utils/camelcaseKeys';
import { privateKeyToAccount } from 'viem/accounts';
import { MessageGenerators } from './utils/messages';

@Injectable()
export class CommandService {
  constructor(private readonly telegramUserService: TelegramUserService) {}

  // Public method to manage setting all of the commands
  public setCommands(bot: Telegraf) {
    this.directionCommand(bot);
    this.startCommand(bot);
  }

  // Define a command method for each command
  private directionCommand(bot: Telegraf) {
    bot.command('direction', Telegraf.reply('To the moon!'));
  }

  private startCommand(bot: Telegraf) {
    bot.command('start', async (ctx) => {
      ctx.reply(`Great! Let's get you set up`);

      const user: User = ctx.message.from;

      try {
        const savedUser = await this.createUserFromTelegramUser(user);

        // eslint-disable-next-line no-useless-escape
        const message = MessageGenerators.walletCreateSuccess({
          address: savedUser.account.address,
          privateKey: savedUser.wallet.privateKey as `0x${string}`,
        });

        await ctx.replyWithMarkdownV2(message, { parse_mode: 'MarkdownV2' });

        ctx.reply(`Cool!`);
      } catch (error) {
        console.error(error);
        ctx.reply(`Oops! Something went wrong`);
      }
    });
  }

  private async createUserFromTelegramUser(user: User) {
    const { id, ...data } = camelcaseKeys<User>(user);

    const savedUser = await this.telegramUserService.create({
      ...data,
      telegramId: id,
    });

    return {
      ...savedUser,
      wallet: savedUser.wallets[0],
      account: privateKeyToAccount(
        savedUser.wallets[0].privateKey as `0x${string}`
      ),
    };
  }
}
