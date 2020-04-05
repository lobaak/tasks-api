import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UserResponseObject } from './user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UserResponseObject[]> {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject());
  }

  async register(data: UsersEntity): Promise<UsersEntity> {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findOne(email: string): Promise<UsersEntity> {
    return await this.userRepository.findOne({ email });
  }
}
