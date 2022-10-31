import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  async create(payload: CreateOrderItemDto) {
    const orderItem = new OrderItem();
    orderItem.quantity = payload.quantity;
    if (payload.orderId) {
      const order = await this.orderRepo.findOneBy({ id: payload.orderId });
      orderItem.order = order;
    }
    if (payload.productId) {
      const product = await this.productRepo.findOneBy({
        id: payload.productId,
      });
      orderItem.product = product;
    }
    return this.orderItemRepo.save(orderItem);
  }

  async update(id: number, payload: UpdateOrderItemDto) {
    const target = await this.orderItemRepo.findOneBy({ id: id });
    if (!target) {
      throw new NotFoundException('Item not found');
    }
    if (payload.orderId) {
      const order = await this.orderRepo.findOneBy({ id: payload.orderId });
      target.order = order;
    }
    if (payload.productId) {
      const product = await this.productRepo.findOneBy({ id: payload.orderId });
      target.product = product;
    }
    if (payload.quantity) {
      target.quantity = payload.quantity;
    }
    return this.orderItemRepo.save(target);
  }

  delete(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
