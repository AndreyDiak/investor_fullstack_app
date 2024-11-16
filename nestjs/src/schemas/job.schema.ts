import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Job>;

@Schema({ collection: 'jobs' })
export class Job {
  @Prop()
  gameId: string;

  @Prop()
  name: string;

  @Prop()
  startSalary: number;

  @Prop()
  type: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
