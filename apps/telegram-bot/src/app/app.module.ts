import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TelegramApiModule } from './telegram-api/telegram-api.module';

@Module({
  imports: [ConfigModule, TelegramApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
