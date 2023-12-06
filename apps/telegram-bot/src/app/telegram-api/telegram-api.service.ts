import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { Logger } from '@nestjs/common';

@Injectable()
export class TelegramApiService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;

  constructor() {
    console.log('TelegramApiService constructor');
  }

  private async initBot() {
    Logger.log('Initializing bot');
    const bot = new Telegraf(process.env.TELEGRAM_BOT_ACCESS_TOKEN);

    this.setCommands(bot);
    bot.help((ctx) => ctx.reply('Send me a sticker'));

    bot.start((ctx) => ctx.reply('Welcome'));
    bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
    bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    // Setting the message handler needs to happen last
    bot.on(message('text'), async (ctx) => {
      const message = `Hey ${ctx.message.from.first_name}, you said: ${ctx.message.text}`;
      // Explicit usage
      // await ctx.telegram.sendMessage(
      //   ctx.message.chat.id,
      //   `Hello ${ctx.state.role}`
      // );

      // console.log(inspect(ctx, { depth: 10 }));

      // Using context shortcut
      await ctx.reply(message);
    });

    await bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    console.log('Bot initialized');

    this.bot = bot;
  }

  /**
   * Set commands for the bot
   *
   * These commands need to be registered with the BotFather
   *
   * To do this programmatically, it's a bit more complex:
   * https://core.telegram.org/bots/api#setmycommands
   */
  private setCommands(bot: Telegraf) {
    bot.command('direction', Telegraf.reply('To the moon!'));
  }

  async onModuleInit() {
    await this.initBot();
  }

  async onModuleDestroy() {
    this.bot.stop();
  }
}
