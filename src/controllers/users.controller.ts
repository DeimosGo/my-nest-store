import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('limit') limit = 20, @Query('offset') offset = 0) {
    return {
      limit,
      offset,
    };
  }
  @Get(':userId')
  getUsersById(@Param('userId') userId: number) {
    return {
      userId,
      name: `David Castillo`,
    };
  }
}
