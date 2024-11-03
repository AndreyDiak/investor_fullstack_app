import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { JwtPayload } from 'src/common/strategies/accessToken.strategy';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/init')
  init(@Req() req: Request & { user: JwtPayload }) {
    const userId = req.user.sub;
    return this.stockService.init();
  }

  @Get('/')
  getAll() {
    return this.stockService.getAll();
  }
}
