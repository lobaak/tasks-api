import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ UsersEntity ]),
		UsersModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET')
			})
		})
	],
	controllers: [ AuthController ],
	providers: [ AuthService, JwtStrategy ],
	exports: [ JwtStrategy, PassportModule ]
})
export class AuthModule {}
