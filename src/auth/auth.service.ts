import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/user.dto';
import { JwtPayload } from './auth.types';
import { Response, Request } from 'express';
import { REFRESH_TOKEN_EXPIRES, ACCESS_TOKEN_EXPIRES } from './auth.accessTokenExpiry';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

const defaultResponse = { accessToken: '', user: undefined };

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
		private readonly jwtService: JwtService
	) {}

	createAccessToken(user: JwtPayload): string {
		return this.jwtService.sign({ email: user.email, id: user.id }, { expiresIn: ACCESS_TOKEN_EXPIRES });
	}

	createRefreshToken(user: JwtPayload): string {
		return this.jwtService.sign(
			{ email: user.email, id: user.id, tokenVersion: user.tokenVersion },
			{ expiresIn: REFRESH_TOKEN_EXPIRES }
		);
	}

	createCookie(res: Response, token: string) {
		res.cookie('rid', token, {
			httpOnly: true
		});
	}

	async validateUser(email: string, pass: string) {
		const user = await this.userRepository.findOne({ email });

		if (user && (await user.comparePassword(pass))) {
			return user;
		}

		return null;
	}

	async login({ body }: { body: LoginUserDto }, res: Response): Promise<Response> {
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
			return res.send(defaultResponse);
		}

		try {
			const { email, tokenVersion }: JwtPayload = this.jwtService.verify(rid);

			const user = await this.userRepository.findOne({ email });

			if (!user) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}

			if (tokenVersion !== user.tokenVersion) {
				return res.send(defaultResponse);
			}

			return res.send({ accessToken: this.createAccessToken(user), user });
		} catch (err) {
			return res.send(defaultResponse);
		}
	}

	async logout(req: Request, res: Response) {
		const { rid } = req.cookies;

		if (!rid) {
			return res.send(defaultResponse);
		}

		try {
			const { email }: JwtPayload = this.jwtService.verify(rid);

			const user = await this.userRepository.findOne({ email });

			if (!user) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}

			await this.userRepository.update(user.id, { tokenVersion: user.tokenVersion + 1 });
		} catch (err) {
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return res.send(defaultResponse);
	}
}
