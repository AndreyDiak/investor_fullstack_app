import { OmitType, PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Game } from 'src/schemas/game.schema';

export class GameCreationPayload extends PartialType(Game) {
  _id: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export class GameUpdationPayload extends OmitType(
  PartialType(GameCreationPayload),
  ['_id'],
) {}
