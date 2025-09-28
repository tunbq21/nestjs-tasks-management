import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';import {v4} from 'uuid';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { isEmpty } from 'class-validator';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        // private taskRepository: TaskRepository
        private readonly taskRepository: TaskRepository,
    ) {}

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.taskRepository.findOneBy({ id, user });
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

     getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, user });
        console.log(result);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }

}
