import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Req() req: Request, @Res() res: Response) {
		return await this.authService.login(req, res);
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
