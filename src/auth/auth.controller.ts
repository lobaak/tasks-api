import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersEntity } from '../users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: UsersEntity) {
    return await this.authService.login(data);
  }
}
