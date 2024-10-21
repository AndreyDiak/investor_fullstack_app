// import {
//   ClickHouseDataFormat,
//   ClickHouseModule,
// } from '@depyronick/nestjs-clickhouse';
// import { Module } from '@nestjs/common';
// import { StockController } from './stock.controller';
// import { StockService } from './stock.service';

// @Module({
//   imports: [
//     ClickHouseModule.register([
//       {
//         name: 'STOCK_SERVER',
//         host: 'http://localhost',
//         port: 8123,
//         format: ClickHouseDataFormat.JSON,
//         database: 'stock',
//       },
//     ]),
//   ],
//   controllers: [StockController],
//   providers: [StockService],
//   exports: [StockService],
// })
// export class StockModule {}
