import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  @Get('/')
  getAll(@Req() req: Request & { user: JwtPayload }) {
    const userId = req.user.sub;
    return this.gameService.getAll(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  getById(@Param() params: any) {
    const gameId = params.id;
    return this.gameService.getOne(gameId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/create')
  create(
    @Req() req: Request & { user: JwtPayload },
    @Body() body: CreateGameInput,
  ) {
    return this.gameService.create(req.user.sub, body);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  update(@Param() id: string, @Body() body: UpdateGameInput) {
    return this.gameService.updateOne(id, body);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  delete(@Param() params: any) {
    const gameId = params.id;
    return this.gameService.delete(gameId);
  }
}
