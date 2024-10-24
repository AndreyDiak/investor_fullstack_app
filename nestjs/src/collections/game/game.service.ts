import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameInput, UpdateGameInput } from 'src/inputs/game.input';
import { GameCreationPayload } from 'src/payloads/game.payload';
import { Game } from 'src/schemas/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async getAll(userId: string) {
    return await this.gameModel.find({ ownerId: userId });
  }

  async create(
    userId: string,
    input: CreateGameInput,
  ): Promise<GameCreationPayload> {
    return await this.gameModel.create({
      ownerId: userId,
      day: 1,
      ...input,
    });
  }

  async update(gameId: string, input: Omit<UpdateGameInput, 'gameId'>) {
    return await this.gameModel.updateOne({ _id: gameId }, input);
  }
}
