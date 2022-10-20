import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
