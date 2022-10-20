import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  private counter = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'David',
      lastName: 'Castillo',
      phone: '952382547',
    },
  ];

  getAll() {
    return this.customers;
  }

  getById(id: number) {
    const customer: Customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counter += 1;
    const newCustomer = {
      id: this.counter,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const indexCustomer = this.customers.findIndex((item) => item.id === id);
    if (indexCustomer === -1) {
      throw new NotFoundException(`Customer with id #${id} not found`);
    }
    const target = this.customers[indexCustomer];
    const replaceCustomer = {
      ...target,
      ...payload,
    };
    this.customers[indexCustomer] = replaceCustomer;
    return replaceCustomer;
  }

  delete(id: number) {
    const indexCustomer = this.customers.findIndex((item) => item.id === id);
    if (indexCustomer === -1) {
      throw new NotFoundException(`Customer with id #${id} not found`);
    }
    this.customers.splice(indexCustomer, 1);
    return {
      id,
      deleted: true,
    };
  }
}
