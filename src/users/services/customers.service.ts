import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  getAll() {
    return this.customerRepo.find();
  }

  async getById(id: number) {
    const customer: Customer = await this.customerRepo.findOneBy({ id: id });
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(payload);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const target = await this.customerRepo.findOneBy({ id: id });
    this.customerRepo.merge(target, payload);
    return this.customerRepo.save(target);
  }

  delete(id: number) {
    return this.customerRepo.delete(id);
  }
}
