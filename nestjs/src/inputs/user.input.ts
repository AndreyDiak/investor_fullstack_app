import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  refreshToken: string;

  @IsString()
  password: string;
}

export class UpdateUserInput extends OmitType(PartialType(CreateUserInput), [
  'password',
] as const) {}
