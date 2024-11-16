import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './collections/auth/auth.module';
import { CreditModule } from './collections/credit/credit.module';
import { GameModule } from './collections/game/game.module';
import { GameTemplateModule } from './collections/game_template/game_template.module';
import { JobModule } from './collections/job/job.module';
import { StockModule } from './collections/stock/stock.module';
import { UserModule } from './collections/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ limit: 10, ttl: 60 }]),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    StockModule,
    UserModule,
    GameModule,
    GameTemplateModule,
    JobModule,
    CreditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
