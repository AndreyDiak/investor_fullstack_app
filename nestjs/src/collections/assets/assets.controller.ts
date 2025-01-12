import { Body, Controller, Param, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller({
  path: 'assets',
  version: '1',
})
export class AssetsController {
  constructor(private readonly assetsService: AssetsService<any>) {}
  @Post(`/:type/add`)
  addAssets(@Param() type: string, @Body() body: any) {
    return this.assetsService.add(body.data, type);
  }

  @Post('/:type/delete/:id')
  deleteAssets(@Param() params: any) {
    const { id, type } = params;
    return this.assetsService.delete(Number(id), type);
  }

  @Post(`/:type/update/:id`)
  updateAssets(@Param() params: any, @Body() body: any) {
    const { id, type } = params;
    return this.assetsService.update(body.data, Number(id), type);
  }
}
