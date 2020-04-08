import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private taskRepository: Repository<TasksEntity>,
  ) {}

  async findAll(): Promise<TasksEntity[]> {
    return this.taskRepository.find();
  }

  async create(data: CreateTaskDto): Promise<TasksEntity> {
    try {
      const task = this.taskRepository.create(data);
      return await this.taskRepository.save(task);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(data: UpdateTaskDto): Promise<UpdateResult> {
    try {
      return await this.taskRepository.update(data.id, data);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async delete(data: DeleteTaskDto): Promise<DeleteResult> {
    try {
      return await this.taskRepository.delete(data.id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
