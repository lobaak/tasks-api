import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ChoresEntity } from './chores.entity';
import { ChoresService } from './chores.service';

@Controller('chores')
export class ChoresController {
  constructor(private choresService: ChoresService) {}

  @Get()
  async findAll(): Promise<ChoresEntity[]> {
    return this.choresService.findAll();
  }

  @Post()
  async create(@Body() data: ChoresEntity) {
    return this.choresService.create(data);
  }

  @Patch()
  async update(@Body() data: ChoresEntity) {
    return this.choresService.update(data);
  }

  @Delete()
  async delete(@Body() id: number) {
    return this.choresService.delete(id);
  }
}
