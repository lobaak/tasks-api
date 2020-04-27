import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { RegisterUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>) {}

	async findAll(): Promise<UsersEntity[]> {
		return await this.userRepository.find();
	}

	async register(data: RegisterUserDto): Promise<UsersEntity> {
		try {
			const user = await this.userRepository.create(data);
			return await this.userRepository.save(user);
		} catch (err) {
			if (err.code === 'SQLITE_CONSTRAINT') {
				throw new HttpException('Email already exists', HttpStatus.CONFLICT);
			}
			throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(data: UpdateUserDto) {
		if (!data.id) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		try {
			return await this.userRepository.update(data.id, data);
		} catch (err) {
			throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async profile(id: string) {
		if (!id) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		return await this.userRepository.findOne({ id }, { relations: [ 'tasks' ] });
	}

	async findOne(email: string): Promise<UsersEntity> {
		return await this.userRepository.findOne({ email });
	}
}
