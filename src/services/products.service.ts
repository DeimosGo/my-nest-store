import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 123,
      stock: 60,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findById(id: number) {
    const response = this.products.find((item) => item.id === id);
    if (!response) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return response;
  }

  create(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const indexProduct = this.products.findIndex((item) => item.id === id);
    if (indexProduct === -1) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    const product = this.products[indexProduct];
    this.products[indexProduct] = {
      ...product,
      ...payload,
    };
    return this.products[indexProduct];
  }
  delete(id: number) {
    const indexProduct = this.products.findIndex((item) => item.id === id);
    if (indexProduct === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    this.products.splice(indexProduct, 1);
    return {
      id,
      deleted: true,
    };
  }
}
