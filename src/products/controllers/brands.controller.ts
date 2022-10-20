import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandService) {}
  @Get()
  getAll() {
    return this.brandService.getAll();
  }
  @Get(':brandId')
  getBrandById(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandService.getById(brandId);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':brandId')
  update(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(brandId, payload);
  }

  @Delete(':brandId')
  delete(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandService.delete(brandId);
  }
}
