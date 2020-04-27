import { Controller, Get, Post, Body, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { TasksEntity } from './tasks.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto } from './tasks.dto';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	async findAll(): Promise<TasksEntity[]> {
		return this.tasksService.findAll();
	}

	@Post()
	async create(@Body(ValidationPipe) data: CreateTaskDto) {
		return this.tasksService.create(data);
	}

	@Patch()
	async update(@Body(ValidationPipe) data: UpdateTaskDto) {
		console.log(data);
		return this.tasksService.update(data);
	}

	@Delete()
	async delete(@Body(ValidationPipe) data: DeleteTaskDto) {
		return this.tasksService.delete(data);
	}
}
