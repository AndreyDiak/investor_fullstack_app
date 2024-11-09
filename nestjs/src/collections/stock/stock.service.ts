import { companies } from '@kit/entities';
import {
  generateStockInitialCount,
  generateStockInitialPrice,
} from '@kit/struct';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from 'src/schemas/stock.schema';

@Injectable()
export class StockService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async init() {
    const stocks: Stock[] = companies.map((company) => {
      const [type, companyName, description, tags] = company;
      const name = `${type} ${companyName}`;
      const price = generateStockInitialPrice();
      const count = generateStockInitialCount();

      return {
        name,
        description,
        price,
        count,
        tags: Array.from(tags),
      };
    });

    await this.stockModel.create(stocks);
  }

  getAll() {
    return this.stockModel.find();
  }
}
