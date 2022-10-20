import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':userId')
  getUsersById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getById(userId);
  }

  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOrdersByUser(userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put()
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.delete(userId);
  }
}
