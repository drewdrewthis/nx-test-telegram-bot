import { Module } from '@nestjs/common';
import { TelegramApiService } from './telegram-api.service';
import { TelegramUserModule } from '../telegram-user/telegram-user.module';
import { CommandService } from './command.service';

@Module({
  imports: [TelegramUserModule],
  providers: [TelegramApiService, CommandService],
  exports: [TelegramApiService],
})
export class TelegramApiModule {}
