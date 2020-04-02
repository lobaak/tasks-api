import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private taskRepository: Repository<TasksEntity>,
  ) {}

  async findAll(): Promise<TasksEntity[]> {
    return this.taskRepository.find();
  }

  async create(task: TasksEntity): Promise<TasksEntity> {
    return await this.taskRepository.save(task);
  }

  async update(task: TasksEntity): Promise<UpdateResult> {
    return await this.taskRepository.update(task.id, task);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
