import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    private configService: ConfigService,
  ) {}
  private counter = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'david@gmail.com',
      password: '1212121212',
      role: 'admin',
    },
  ];

  getAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey);
    console.log(dbName);
    return this.users;
  }

  getById(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counter += 1;
    const newUser = {
      id: this.counter,
      ...payload,
    };
    this.users.push(newUser);
  }

  update(id: number, payload: UpdateUserDto) {
    const userIndex = this.users.findIndex((item) => item.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    const target = this.users[userIndex];
    const replace = {
      ...target,
      ...payload,
    };
    this.users[userIndex] = replace;
    return replace;
  }

  delete(id: number) {
    const userIndex = this.users.findIndex((item) => item.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    this.users.splice(userIndex, 1);
    return {
      id,
      deleted: true,
    };
  }

  getOrdersByUser(id: number): Order {
    const user = this.getById(id);
    return {
      date: new Date(),
      user,
      products: this.productService.findAll(),
    };
  }
}
