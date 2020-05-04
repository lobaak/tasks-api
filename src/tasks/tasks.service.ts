import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
	constructor(@InjectRepository(TasksEntity) private taskRepository: Repository<TasksEntity>) {}

	async findAll(): Promise<TasksEntity[]> {
		return this.taskRepository.find();
	}

	async findOne(id: string): Promise<TasksEntity> {
		const task = await this.taskRepository.findOne({ id });

		if (!task) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}

		return task;
	}

	async create(data: CreateTaskDto): Promise<TasksEntity> {
		try {
			const task = this.taskRepository.create(data);
			return await this.taskRepository.save(task);
		} catch (err) {
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(data: UpdateTaskDto): Promise<UpdateResult> {
		try {
			return await this.taskRepository.update(data.id, data);
		} catch (err) {
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async delete(data: DeleteTaskDto): Promise<DeleteResult> {
		try {
			return await this.taskRepository.delete(data.id);
		} catch (err) {
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
