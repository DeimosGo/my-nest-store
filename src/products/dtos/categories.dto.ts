import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
