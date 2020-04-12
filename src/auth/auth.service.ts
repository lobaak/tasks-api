import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/user.dto';
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
      return user;
    }

    return null;
  }

  async login(
    { body }: { body: LoginUserDto },
    res,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUser(body.email, body.password);

    if (!user) {
      throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
    }
    const payload: JwtPayload = { email: user.email, id: user.id };

    const refreshToken = this.jwtService.sign(payload);

    res.cookie('rid', refreshToken, {
      httpOnly: true,
      path: '/refresh-token',
    });

    return res.json({ accessToken: this.jwtService.sign(payload) });
  }

  async refreshToken(req): Promise<{ accessToken: string }> {
    const token = req.cookies.rid;

    if (!token) {
      return { accessToken: '' };
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token);

      if (!payload.email) {
        throw new NotFoundException();
      }

      return {
        accessToken: this.jwtService.sign({
          email: payload.email,
          id: payload.id,
        }),
      };
    } catch (err) {
      console.log(err.message || err.name);
      return { accessToken: '' };
    }
  }
}
