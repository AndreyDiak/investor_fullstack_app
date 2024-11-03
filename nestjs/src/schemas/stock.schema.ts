import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Stock>;

@Schema({ collection: 'stocks', timestamps: true })
export class Stock {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  tags: string[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);
