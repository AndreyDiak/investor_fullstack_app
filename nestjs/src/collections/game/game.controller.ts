import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { JwtPayload } from 'src/common/types/jwt';
import { CreateGameInput, UpdateGameInput } from 'src/inputs/game.input';
import { GameService } from './game.service';

@Controller({
  path: 'games',
  version: '1',
})
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/')
  getAll(@Req() req: Request & { user: JwtPayload }) {
    const userId = req.user.sub;
    return this.gameService.getAll(userId);
  }

  @Get('/:id')
  getById(@Param() params: any) {
    const gameId = params.id;
    return this.gameService.getOne(gameId);
  }

  @Post('/create')
  create(
    @Req() req: Request & { user: JwtPayload },
    @Body() body: CreateGameInput,
  ) {
    return this.gameService.create(req.user.sub, body);
  }

  @Put('/:id')
  update(@Param() id: string, @Body() body: UpdateGameInput) {
    return this.gameService.updateOne(id, body);
  }

  @Delete('/:id')
  delete(@Param() params: any) {
    const gameId = params.id;
    return this.gameService.delete(gameId);
  }
}
