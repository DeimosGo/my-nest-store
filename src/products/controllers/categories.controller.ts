import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CategoriesService } from '../services/categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  getAll() {
    return this.categoriesService.getAll();
  }
  @Get(':categoryId')
  getById(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.getById(categoryId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':categoryId')
  update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryId, payload);
  }

  @Delete(':categoryId')
  delete(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.delete(categoryId);
  }
}
