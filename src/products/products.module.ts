import { Module } from '@nestjs/common';
import { BrandService } from './services/brand.service';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  imports: [],
  controllers: [BrandsController, ProductsController, CategoriesController],
  providers: [BrandService, ProductsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
