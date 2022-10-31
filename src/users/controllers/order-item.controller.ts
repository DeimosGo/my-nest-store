import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  @Put(':itemId')
  update(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(itemId, payload);
  }

  @Delete(':itemId')
  delete(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.orderItemService.delete(itemId);
  }
}
