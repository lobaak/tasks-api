import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async register(@Body() data: UsersEntity) {
    return this.usersService.register(data);
  }

  @Post('email')
  async findOne(@Body() data: UsersEntity) {
    console.log(data);
    return this.usersService.findOne(data.email);
  }

  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
