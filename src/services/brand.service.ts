import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandService {
  private counter = 2;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Adidas',
      description: 'American brand of sports clothes',
      image: 'https://example.com/example.png',
    },
    {
      id: 2,
      name: 'Nike',
      description: 'American brand of sports clothes',
      image: 'https://example.com/example.png',
    },
  ];

  getAll() {
    return this.brands;
  }
  getById(id: number) {
    const response = this.brands.find((item) => item.id === id);
    if (!response) {
      throw new NotFoundException(`Brand with id #${id} not found`);
    }
    return response;
  }

  create(payload: CreateBrandDto) {
    this.counter += 1;
    const newBrand = {
      id: this.counter,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brandIndex = this.brands.findIndex((item) => item.id === id);
    if (brandIndex === -1) {
      throw new NotFoundException(`Brand with id #${id} not found`);
    }
    const brandReplace = this.brands[brandIndex];
    this.brands[brandIndex] = {
      ...brandReplace,
      ...payload,
    };
    return this.brands[brandIndex];
  }

  delete(id: number) {
    const brandIndex = this.brands.findIndex((item) => item.id === id);
    if (brandIndex === -1) {
      throw new NotFoundException(`Brand with id #${id} not found`);
    }
    this.brands.splice(brandIndex, 1);
    return {
      id,
      deleted: true,
    };
  }
}
