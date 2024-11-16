import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from 'src/schemas/template.schema';
import { GameTemplateController } from './game_template.controller';
import { GameTemplateService } from './game_template.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
  ],
  controllers: [GameTemplateController],
  providers: [GameTemplateService],
  exports: [GameTemplateService],
})
export class GameTemplateModule {}
