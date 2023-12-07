import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { Logger } from '@nestjs/common';
import { CommandService } from './command.service';

@Injectable()
export class TelegramApiService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;

  constructor(private readonly commandService: CommandService) {
    console.log('TelegramApiService constructor');
  }

  private async initBot() {
    Logger.log('Initializing bot');
    const bot = new Telegraf(process.env.TELEGRAM_BOT_ACCESS_TOKEN);

    this.commandService.setCommands(bot);

    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.start((ctx) => ctx.reply('Welcome! Click /start to begin'));
    bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    // Setting the message handler needs to happen last
    bot.on(message('text'), async (ctx) => {
      const message = `Hey ${ctx.message.from.first_name}, you said: ${ctx.message.text}`;
      await ctx.reply(message);
    });

    await bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    console.log('Bot initialized');

    this.bot = bot;
  }

  async onModuleInit() {
    await this.initBot();
  }

  async onModuleDestroy() {
    this.bot.stop();
  }
}
