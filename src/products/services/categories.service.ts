import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  private counter = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'category 1',
      description: 'this is a created hard coded category',
    },
  ];
  getAll() {
    return this.categories;
  }

  getById(categoryId: number) {
    const category = this.categories.find((item) => item.id === categoryId);
    if (!Category) {
      throw new NotFoundException(`Category with id #${categoryId} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counter += 1;
    const category = {
      id: this.counter,
      ...payload,
    };
    this.categories.push(category);
    return category;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const categoryIndex = this.categories.findIndex((item) => item.id === id);
    if (categoryIndex === -1) {
      throw new NotFoundException(`Category with id #${id} not found`);
    }
    const categoryReplace = this.categories[categoryIndex];
    this.categories[categoryIndex] = {
      ...categoryReplace,
      ...payload,
    };
    return this.categories[categoryIndex];
  }

  delete(id: number) {
    const categoryIndex = this.categories.findIndex((item) => item.id === id);
    if (categoryIndex === -1) {
      throw new NotFoundException(`Category with id #${id} not found`);
    }
    this.categories.splice(categoryIndex, 1);
    return {
      id,
      deleted: true,
    };
  }
}
