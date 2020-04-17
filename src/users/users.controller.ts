import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  Param,
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

  @Get('profile/:id')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Param() params: { id: string }) {
    return this.usersService.profile(params.id);
  }
}
