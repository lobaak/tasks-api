import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoresEntity } from './chores.entity';

@Injectable()
export class ChoresService {
	constructor(@InjectRepository(ChoresEntity) private choreRepository: Repository<ChoresEntity>) {}

	async findAll(): Promise<ChoresEntity[]> {
		return this.choreRepository.find();
	}

	async create(chore: ChoresEntity): Promise<ChoresEntity> {
		return await this.choreRepository.save(chore);
	}

	async update(chore: ChoresEntity): Promise<UpdateResult> {
		return await this.choreRepository.update(chore.id, chore);
	}

	async delete(id: number): Promise<DeleteResult> {
		return await this.choreRepository.delete(id);
	}
}
