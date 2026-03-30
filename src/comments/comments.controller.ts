import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('task/:taskId')
  findByTaskId(@Param('taskId') taskId: string) {
    return this.commentsService.findByTaskId(taskId);
  }

  @Post()
  create(@Body() payload: { taskId: string; content: string }) {
    return this.commentsService.create(payload.taskId, payload.content);
  }
}
