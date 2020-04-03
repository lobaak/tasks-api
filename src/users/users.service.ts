import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>) {}

	async findAll(): Promise<UsersEntity[]> {
		return this.userRepository.find();
	}

	async register(data: UsersEntity): Promise<UsersEntity> {
		const user = await this.userRepository.create(data);
		return await this.userRepository.save(user);
	}

	async findOne(email: string): Promise<UsersEntity> {
		return this.userRepository.findOne({ email });
	}
}
