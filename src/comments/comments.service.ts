import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async create(taskId: string, content: string, authorId: string = 'CurrentAgent'): Promise<Comment> {
    const created = new this.commentModel({ taskId, content, authorId });
    return created.save();
  }

  async findByTaskId(taskId: string): Promise<Comment[]> {
    return this.commentModel.find({ taskId }).sort({ createdAt: -1 }).exec();
  }
}
