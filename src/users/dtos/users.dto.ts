import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType /* , ApiProperty */ } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  /* @ApiProperty({ description: 'The user email' }) */
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
