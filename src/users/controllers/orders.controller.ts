import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':orderId')
  findById(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.findOne(orderId);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':orderId')
  update(
    @Body() payload: UpdateOrderDto,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return this.orderService.update(orderId, payload);
  }

  @Delete(':orderId')
  delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.delete(orderId);
  }
}
