import { PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { PlayerMood } from 'src/common/types/mood';

export class CreateGameInput {
  @IsString()
  jobId: string;

  @IsArray()
  @IsString()
  creditIds: string[];

  @IsString()
  mood: PlayerMood;

  @IsNumber()
  balance: number;
}

export class UpdateGameInput extends PartialType(CreateGameInput) {}
