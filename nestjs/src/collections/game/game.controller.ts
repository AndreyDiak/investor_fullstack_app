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
  getAll() {
    return this.gameService.getAll();
  }

  @Get('/my')
  getMy(@Req() req: Request & { user: JwtPayload }) {
    const userID = req.user.sub;
    return this.gameService.getByFilter({ ownerId: userID });
  }

  @Get('/:id')
  getById(@Param() id: string) {
    return this.gameService.getOne(id);
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
  delete(@Param() id: string) {
    return this.gameService.delete(id);
  }
}
