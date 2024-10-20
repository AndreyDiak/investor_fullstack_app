import { Controller, Get, Post } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('/init')
  init() {
    return this.stockService.init();
  }

  @Get('/')
  getAll() {
    return this.stockService.getAll();
  }
}
