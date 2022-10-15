import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola mundo con NestJS!!!';
  }

  @Get('new')
  newEndPoint() {
    return 'This is new';
  }

  @Get('/ruta/')
  anotherNewEndPoint() {
    return 'Another new endpoint';
  }
}
