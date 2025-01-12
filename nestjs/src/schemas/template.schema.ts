import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ITemplateDifficulty,
  ITemplateJobPosition,
} from '@raymix/investor-kit';
import { HydratedDocument } from 'mongoose';

@Schema()
class Job {
  @Prop()
  name: string;

  @Prop()
  startSalary: number;

  @Prop()
  type: ITemplateJobPosition;

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
  difficulty: ITemplateDifficulty;

  @Prop()
  credits: TemplateCredit[];

  @Prop()
  properties: TemplateProperty[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
