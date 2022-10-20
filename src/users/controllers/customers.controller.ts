import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get()
  getCustomers() {
    return this.customerService.getAll();
  }

  @Get(':customerId')
  getCustomersById(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.getById(customerId);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':customerId')
  update(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(customerId, payload);
  }

  @Delete(':customerId')
  delete(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.delete(customerId);
  }
}
