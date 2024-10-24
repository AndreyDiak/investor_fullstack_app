import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { JwtPayload } from 'src/common/strategies/accessToken.strategy';
import { CreateGameInput, UpdateGameInput } from 'src/inputs/game.input';
import { GameService } from './game.service';

@Controller({
  path: 'games',
  version: '1',
})
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/')
  getAll(@Req() req: Request & { user: JwtPayload }) {
    const userId = req.user.sub;
    return this.gameService.getAll(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/create')
  create(
    @Req() req: Request & { user: JwtPayload },
    @Body() body: CreateGameInput,
  ) {
    return this.gameService.create(req.user.sub, body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/update')
  update(
    @Req() req: Request & { user: JwtPayload },
    @Body() body: UpdateGameInput,
  ) {
    const { gameId, ...rest } = body;
    return this.gameService.update(gameId, rest);
  }
}
