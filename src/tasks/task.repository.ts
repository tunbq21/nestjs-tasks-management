import { DataSource, Repository } from 'typeorm';
import { Task } from './dto/task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {

  }

  // Bạn có thể thêm các method custom ở đây
