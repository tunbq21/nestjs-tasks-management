import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';import {v4} from 'uuid';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { isEmpty } from 'class-validator';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOneBy({ id });
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.taskRepository.save(task);
        return task;
    }
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) || task.description.includes(search),
    //         );
    //     }

    //     return tasks;
    // }

    // getTaskById(id: string): Task | undefined {
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         // throw new Error(`Task with ID "${id}" not found`);
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }
    //     return found;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: v4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }
    
    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found?.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
    //     const task = this.getTaskById(id);
    //     if (task) {
    //         task.status = status;
    //     }
    //     return task;
    // }
}
