import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types, HydratedDocument } from 'mongoose';
import { TaskStatus } from '../../shared/enums/task-status.enum';
import type { Comment } from '../../comments/schemas/comment.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true, collection: 'tasks' })
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
