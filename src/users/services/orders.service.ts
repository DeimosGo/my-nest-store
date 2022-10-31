import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id: id },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const order = new Order();
    if (payload.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: payload.customerId,
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const target = await this.orderRepo.findOneBy({ id: id });
    if (target) {
      const customer = await this.customerRepo.findOneBy({
        id: payload.customerId,
      });
      target.customer = customer;
    }
    return this.orderRepo.save(target);
  }

  delete(id: number) {
    return this.orderRepo.delete(id);
  }
}
