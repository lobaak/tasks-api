import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async register(@Body(ValidationPipe) data: RegisterUserDto) {
    return this.usersService.register(data);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Body() data: { id: string }) {
    return this.usersService.profile(data);
  }
}
