import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Company,
  CompanyTag,
  generateStockInitialCount,
  generateStockInitialPrice,
} from '@raymix/investor-kit';
import { Model } from 'mongoose';
import { Stock } from 'src/schemas/stock.schema';

@Injectable()
export class StockService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async init(companies: Company[]) {
    const stocks: Stock[] = companies.map((company) => {
      const { type, name, description, tags } = company;
      const fullName = `${type} ${name}`;
      const price = generateStockInitialPrice();
      const count = generateStockInitialCount();

      return {
        name: fullName,
        description,
        price,
        count,
        tags: Array.from(tags) as CompanyTag[],
      };
    });

    await this.stockModel.create(stocks);
  }

  getAll() {
    return this.stockModel.find();
  }
}
