import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  getAll() {
    return this.categoryRepo.find();
  }

  async getById(categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id #${categoryId} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const target = await this.categoryRepo.findOneBy({ id: id });
    this.categoryRepo.merge(target, payload);
    return this.categoryRepo.save(target);
  }

  delete(id: number) {
    return this.categoryRepo.delete(id);
  }
}
