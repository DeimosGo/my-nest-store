import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders(@Query('limit') limit = 40, @Query('offset') offset = 0) {
    return {
      limit,
      offset,
    };
  }
  @Get(':orderId')
  getOrderById(@Param('orderId') orderId: number) {
    return {
      orderId: orderId,
      name: `yesterday order`,
    };
  }
}
