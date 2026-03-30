import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from '../shared/enums/task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() payload: any) {
    return this.tasksService.create(payload);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.updateStatus(id, status);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.tasksService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
