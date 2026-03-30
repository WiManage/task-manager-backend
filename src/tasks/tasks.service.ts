import { Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { TaskStatus } from '../shared/enums/task-status.enum';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async onModuleInit() {
    const count = await this.taskModel.countDocuments();
    if (count === 0) {
      this.logger.log('Database empty, seeding 50 tasks...');
      const statuses = [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.READY];
      const tasksToInsert = [];
      for (let i = 1; i <= 50; i++) {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        tasksToInsert.push({
          title: `Tâche Futuriste #${i}`,
          description: `Description générée automatiquement pour la tâche ${i}. L'objectif est de valider le système avec de vraies données.`,
          status: randomStatus
        });
      }
      await this.taskModel.insertMany(tasksToInsert);
      this.logger.log('50 tasks seeded successfully.');
    }
  }

  async create(createData: Partial<Task>): Promise<Task> {
    const createdTask = new this.taskModel(createData);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().populate('comments').exec();
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    
    if (!updatedTask) throw new NotFoundException(`Task ${id} not found`);
    return updatedTask;
  }

  async update(id: string, updateData: Partial<Task>): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedTask) throw new NotFoundException(`Task ${id} introuvable`);
    return updatedTask;
  }

  async remove(id: string): Promise<void> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) throw new NotFoundException(`Task ${id} not found`);
  }
}
