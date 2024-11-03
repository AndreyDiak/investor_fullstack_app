import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateJobInput {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  startSalary: number;
}

export class UpdateJobInput extends PartialType(CreateJobInput) {}
