import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { CreateGameInput, UpdateGameInput } from 'src/inputs/game.input';
import { GameCreationPayload } from 'src/payloads/game.payload';
import { Game } from 'src/schemas/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

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

  async getAll() {
    return await this.gameModel.find();
  }

  async getOne(id: string): Promise<Game | undefined> {
    return this.gameModel.findById(id);
  }

  async getByFilter(filter?: RootFilterQuery<Game>): Promise<Game[]> {
    return this.gameModel.find(filter);
  }

  async updateOne(id: string, payload: Omit<UpdateGameInput, 'gameId'>) {
    return this.gameModel.findByIdAndUpdate(id, payload);
  }

  async delete(id: string) {
    return this.gameModel.findByIdAndDelete(id);
  }
}
