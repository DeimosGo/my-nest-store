import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { PartialType /* , ApiProperty */ } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  /* @ApiProperty({ description: 'The user email' }) */
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
