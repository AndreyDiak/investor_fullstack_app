import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PlayerMood } from 'src/common/types/mood';

export type GameDocument = HydratedDocument<Game>;

@Schema({ collection: 'posts', timestamps: true })
export class Game {
  @Prop()
  ownerId: string;

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

export const GameSchema = SchemaFactory.createForClass(Game);
