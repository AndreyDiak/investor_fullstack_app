import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClickHouseModule.register([
      {
        name: 'STOCKS_SERVER',
        host: '127.0.0.1',
        // password: '7h3ul71m473p4555w0rd',
        port: 8123,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
