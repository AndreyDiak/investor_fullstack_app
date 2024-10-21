// import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
// import { Inject, Injectable } from '@nestjs/common';

// interface Stock {
//   createdAt: number;
//   updatedAt: number;
//   name: string;
//   price: number;
//   // ...
// }

// @Injectable()
// export class StockService {
//   constructor(
//     @Inject('STOCK_SERVER') private readonly stockServer: ClickHouseClient,
//   ) {
//     // this.stockServer.query('SELECT * FROM stocks')
//   }

//   init() {
//     return this.stockServer.insert<Stock>('stocks', [
//       {
//         createdAt: new Date().getTime(),
//         updatedAt: new Date().getTime(),
//         name: 'OOO ЛеснойСАД',
//         price: Number((Math.random() * 100).toFixed(1)),
//       },
//       {
//         createdAt: new Date().getTime(),
//         updatedAt: new Date().getTime(),
//         name: 'OOO Солнышко',
//         price: Number((Math.random() * 100).toFixed(1)),
//       },
//       {
//         createdAt: new Date().getTime(),
//         updatedAt: new Date().getTime(),
//         name: 'OАО Кибер Безопасность',
//         price: Number((Math.random() * 100).toFixed(1)),
//       },
//     ]);
//   }

//   getAll() {
//     return this.stockServer.query('SELECT * FROM stocks');
//   }
// }
