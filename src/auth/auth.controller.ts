import { Controller, Post, Req, Res, Get, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginUserDto } from '../users/user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body(ValidationPipe) body: LoginUserDto, @Res() res: Response) {
		return await this.authService.login(body, res);
	}

	@Get('refresh-token')
	async refreshToken(@Req() req: Request, @Res() res: Response) {
		return await this.authService.refreshToken(req, res);
	}

	@Get('logout')
	async logout(@Req() req: Request, @Res() res: Response) {
		return await this.authService.logout(req, res);
	}
}
