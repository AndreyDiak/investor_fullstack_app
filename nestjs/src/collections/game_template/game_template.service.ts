import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from 'src/schemas/template.schema';

import gameTemplates from '../../../../assets/templates.json';

@Injectable()
export class GameTemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<Template>,
  ) {}

  async obtain() {
    const templates = await this.templateModel.find();
    if (templates.length !== 0) {
      return templates;
    }
    return await this.templateModel.create(gameTemplates);
  }

  async removeAll() {
    await this.templateModel.deleteMany();
  }
}
