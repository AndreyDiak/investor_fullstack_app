import { Controller, Delete, Get } from '@nestjs/common';
import { GameTemplateService } from './game_template.service';

@Controller({
  path: 'templates',
  version: '1',
})
export class GameTemplateController {
  constructor(private readonly gameTemplateService: GameTemplateService) {}

  @Get('/')
  getAll() {
    return this.gameTemplateService.obtain();
  }

  @Delete('/')
  removeAll() {
    return this.gameTemplateService.removeAll();
  }
}
