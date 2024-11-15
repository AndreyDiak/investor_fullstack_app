import { Controller, Get, Post, Req } from '@nestjs/common';
import { JwtPayload } from 'src/common/types/jwt';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('/init')
  init(@Req() req: Request & { user: JwtPayload }) {
    return this.stockService.init();
  }

  @Get('/')
  getAll() {
    return this.stockService.getAll();
  }
}
