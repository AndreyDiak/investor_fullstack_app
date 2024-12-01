import {
  JobVariant,
  TemplateCredit,
  TemplateDifficulty,
  TemplateJob,
  TemplateProperty,
} from '@kit/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class Job {
  @Prop()
  name: string;

  @Prop()
  startSalary: number;

  @Prop()
  type: JobVariant;

  @Prop()
  savings: number;

  @Prop()
  imgUrl: string;
}

const TemplateJob = SchemaFactory.createForClass(Job);

export type TemplateDocument = HydratedDocument<Template>;

@Schema({ collection: 'templates', timestamps: true })
export class Template {
  @Prop({ type: TemplateJob })
  job: Job;

  @Prop()
  difficulty: TemplateDifficulty;

  @Prop()
  credits: TemplateCredit[];

  @Prop()
  properties: TemplateProperty[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
