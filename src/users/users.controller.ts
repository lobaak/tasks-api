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

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
