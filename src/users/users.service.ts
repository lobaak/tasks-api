import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { RegisterUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.userRepository.find();
  }

  async register(data: RegisterUserDto): Promise<UsersEntity> {
    try {
      const user = await this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async findOne(email: string): Promise<UsersEntity> {
    return await this.userRepository.findOne({ email });
  }
}
