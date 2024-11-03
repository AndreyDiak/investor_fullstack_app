import { generateStockInitialPrice } from '@kit/struct';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from 'src/schemas/stock.schema';
import assets from '../../../assets.json';
import { UserService } from '../user/user.service';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
    private userService: UserService,
  ) {}

  async init() {
    const companies = assets.companies as [string, string, string][];
    const stocks: Stock[] = companies.map((company) => {
      const [type, companyName, description] = company;
      const name = `${type} ${companyName}`;
      const price = generateStockInitialPrice();
      return {
        name,
        description,
        price,
        tags: [],
      };
    });

    await this.stockModel.create(stocks);
  }

  getAll() {
    return this.stockModel.find();
  }
}
