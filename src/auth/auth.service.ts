import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    if (user && (await user.comparePassword(pass))) {
      return user.toResponseObject();
    }

    return null;
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUser(
      authCredentialsDto.email,
      authCredentialsDto.password,
    );

    if (!user) {
      throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
