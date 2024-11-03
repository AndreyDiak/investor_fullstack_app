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

  async init(userId: string) {
    const companies = assets.companies as [string, string, string][];
    // const user = await this.userService.findOneByID(userId);
    const stocks: Stock[] = companies.map((company) => {
      const [type, companyName, description] = company;
      const name = `${type} ${companyName}`;
    });
  }

  getAll() {
    // return this.stockServer.query('SELECT * FROM stocks');
  }
}
