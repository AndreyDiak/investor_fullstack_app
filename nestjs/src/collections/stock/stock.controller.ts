import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Company } from '@raymix/investor-kit';
import { JwtPayload } from 'src/common/types/jwt';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('/init')
  init(
    @Body() body: { companies: Company[] },
    @Req() req: Request & { user: JwtPayload },
  ) {
    const { companies } = body;
    return this.stockService.init(companies);
  }

  @Get('/')
  getAll() {
    return this.stockService.getAll();
  }
}
