import {
  Controller,
  Get,
  /* Query, */
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  /* ParseIntPipe, */
} from '@nestjs/common';
import { ParseIntPipe } from '../common/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  get() {
    /*
  @Get()
  get(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    const { limit, offset } = params;
    return {
      limit,
      offset,
      brand,
    }; */
    return this.productsService.findAll();
  }

  @Get('filter')
  getFilter() {
    return {
      filter: `This is a filter`,
    };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getById(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findById(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.delete(productId);
  }
}
