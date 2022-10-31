import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly productId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly orderId: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
