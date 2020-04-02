import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @Post()
  async register(@Body() data: UsersEntity): Promise<UsersEntity> {
    return this.usersService.register(data);
  }
}
