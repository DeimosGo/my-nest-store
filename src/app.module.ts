import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controllers/categories.controller';
import { UsersController } from './controllers/users.controller';
import { OrdersController } from './controllers/orders.controller';
import { CustomersController } from './controllers/customers.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { BrandService } from './services/brand.service';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CategoriesController,
    UsersController,
    OrdersController,
    CustomersController,
    BrandsController,
    ProductsController,
  ],
  providers: [AppService, ProductsService, BrandService, CategoriesService],
})
export class AppModule {}
