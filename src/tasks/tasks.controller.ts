import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { TasksEntity } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('chores')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<TasksEntity[]> {
    return this.tasksService.findAll();
  }

  @Post()
  async create(@Body() data: TasksEntity) {
    return this.tasksService.create(data);
  }

  @Patch()
  async update(@Body() data: TasksEntity) {
    return this.tasksService.update(data);
  }

  @Delete()
  async delete(@Body() id: number) {
    return this.tasksService.delete(id);
  }
}
