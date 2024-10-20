import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { Inject, Injectable } from '@nestjs/common';

interface Stocks {
  user_id: number;
  user_name: string;
  message: string;
}

const query = `
CREATE TABLE IF NOT EXISTS Stocks (
    user_id UInt32,
    user_name String,
    message String,
)
ENGINE = MergeTree()
PRIMARY KEY (user_id, timestamp)
`;

@Injectable()
export class AppService {
  constructor(
    @Inject('STOCKS_SERVER')
    private readonly analyticsServer: ClickHouseClient,
  ) {
    this.analyticsServer.query(query).subscribe({
      complete: () => {
        console.log('DB CREATED');
      },
      next(value) {
        console.log({ value });
      },
    });
    this.analyticsServer
      .insert<Stocks>('Stocks', [
        {
          user_id: 1,
          user_name: 'Andrey',
          message: 'hello world',
        },
      ])
      .subscribe({
        error: (err: any): void => {
          // called when an error occurred during insert
        },
        next: (r): void => {
          // currently next does not emits anything for inserts
        },
        complete: (): void => {
          // called when insert is completed
          console.log('inserted');
        },
      });
  }
}
