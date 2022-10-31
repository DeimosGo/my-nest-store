import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between, FindOptionsWhere } from 'typeorm';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const { limit, offset, maxPrice, minPrice } = params;
      const where: FindOptionsWhere<Product> = {};
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findById(id: number) {
    const response = await this.productRepo.findOne({
      where: { id: id },
      relations: ['brand', 'categories'],
    });
    if (!response) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return response;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);
    if (payload.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: payload.brandId });
      newProduct.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(payload.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const target = await this.productRepo.findOneBy({ id: id });
    if (changes.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: changes.brandId });
      target.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesIds),
      });
      target.categories = categories;
    }
    this.productRepo.merge(target, changes);
    return this.productRepo.save(target);
  }

  async addCategoryFromProduct(productId: number, categoryId: number) {
    const target = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    if (!target) {
      throw new NotFoundException(`Element not found`);
    }
    const category = await this.categoryRepo.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException(`The category doesnt exist in this product`);
    }
    target.categories.push(category);
    return this.productRepo.save(target);
  }

  async removeCategoryFromProduct(productId: number, categoryId: number) {
    const target = await this.findById(productId);
    target.categories = target.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(target);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
