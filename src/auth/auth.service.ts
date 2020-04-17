import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/user.dto';
import { JwtPayload } from './auth.types';
import { Response, Request } from 'express';
import {
  REFRESH_TOKEN_EXPIRES,
  ACCESS_TOKEN_EXPIRES,
} from './auth.accessTokenExpiry';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  createAccessToken(user: JwtPayload): string {
    return this.jwtService.sign(
      { email: user.email, id: user.id },
      { expiresIn: ACCESS_TOKEN_EXPIRES },
    );
  }

  createRefreshToken(user: JwtPayload): string {
    return this.jwtService.sign(
      { email: user.email, id: user.id, tokenVersion: user.tokenVersion },
      { expiresIn: REFRESH_TOKEN_EXPIRES },
    );
  }

  createCookie(res, token) {
    res.cookie('rid', token, {
      httpOnly: true,
    });
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    if (user && (await user.comparePassword(pass))) {
      return user;
    }

    return null;
  }

  async login(
    { body }: { body: LoginUserDto },
    res: Response,
  ): Promise<Response> {
    const user = await this.validateUser(body.email, body.password);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const refreshToken = this.createRefreshToken(user);
    this.createCookie(res, refreshToken);

    return res.send({ accessToken: this.createAccessToken(user), user });
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { rid } = req.cookies;

    if (!rid) {
      return res.send({ accessToken: '' });
    }

    try {
      const { email, tokenVersion }: JwtPayload = this.jwtService.verify(rid);

      const user = await this.usersService.findOne(email);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      if (tokenVersion !== user.tokenVersion) {
        return res.send({ accessToken: '' });
      }

      // const refreshToken = this.createRefreshToken(user);
      // this.createCookie(res, refreshToken);

      return res.send({ accessToken: this.createAccessToken(user), user });
    } catch (err) {
      console.log(err.message || err.name);
      return res.send({ accessToken: '' });
    }
  }
}
