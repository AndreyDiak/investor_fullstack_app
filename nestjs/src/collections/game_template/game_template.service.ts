import { gameTemplates } from '@kit/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from 'src/schemas/template.schema';

@Injectable()
export class GameTemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<Template>,
  ) {}

  async getAll() {
    return this.templateModel.find();
  }

  async init() {
    return await this.templateModel.create(gameTemplates);
  }

  async removeAll() {
    await this.templateModel.deleteMany();
  }
}
