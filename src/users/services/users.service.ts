import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService,
  ) {}
  getAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async getById(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    if (payload.customerId) {
      const customer = await this.customerService.getById(payload.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto) {
    const target = await this.userRepo.findOneBy({ id: id });
    this.userRepo.merge(target, payload);
    return this.userRepo.save(target);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }

  /*   async getOrdersByUser(id: number) {
    const user = this.getById(id);
    return {
      date: new Date(),
      user,
      products: await this.productService.findAll(),
    };
  } */
}
