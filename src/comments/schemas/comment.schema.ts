import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types, HydratedDocument } from 'mongoose';
import type { Task } from '../../tasks/schemas/task.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true, collection: 'comments' })
export class Comment {
  @Prop({ required: true })
  content: string;

  // Relation inverse vers la tâche
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true })
  taskId: Task;

  @Prop({ required: true })
  authorId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
