import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { PlayerMood } from 'src/common/types/mood'

export type GameDocument = HydratedDocument<Game>;

@Schema({ collection: 'credits', timestamps: true })
export class Game {

  @Prop()
  day: number;

  @Prop()
  balance: number;

  @Prop()
  mood: PlayerMood;

  @Prop()
  creditIds: string[];

  @Prop()
  jobId: string;
}

export const CreditSchema = SchemaFactory.createForClass(Game);
