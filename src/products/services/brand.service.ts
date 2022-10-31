import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  getAll() {
    return this.brandRepo.find();
  }
  async getById(id: number) {
    const response = await this.brandRepo.findOne({
      where: { id: id },
      relations: ['products'],
    });
    if (!response) {
      throw new NotFoundException(`Element with id #${id} not found`);
    }
    return response;
  }

  create(payload: CreateBrandDto) {
    const newProduct = this.brandRepo.create(payload);
    return this.brandRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const target = await this.brandRepo.findOneBy({ id: id });
    this.brandRepo.merge(target, payload);
    this.brandRepo.save(target);
  }

  delete(id: number) {
    return this.brandRepo.delete(id);
  }
}
