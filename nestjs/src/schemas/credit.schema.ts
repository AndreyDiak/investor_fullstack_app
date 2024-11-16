import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreditDocument = HydratedDocument<Credit>;

@Schema({ collection: 'credits', timestamps: true })
export class Credit {
  @Prop()
  gameId: string;

  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  repaidAmount: number;

  @Prop()
  payment: number;
}

export const CreditSchema = SchemaFactory.createForClass(Credit);
