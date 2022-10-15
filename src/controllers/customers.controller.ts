import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers(@Query('limit') limit = 50, @Query('offset') offset = 0) {
    return {
      customers: 'Here will show the list',
      limit: limit,
      offset: offset,
      type: `El tipo de variable es ${typeof limit}`,
    };
  }

  @Get(':customerId')
  getCustomersById(@Param('customerId') customerId: number) {
    return {
      customerId,
    };
  }
}
