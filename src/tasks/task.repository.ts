// import { DataSource, Repository } from 'typeorm';
// import { Task } from './dto/task.entity';
// import { Injectable } from '@nestjs/common';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { TaskStatus } from './tasks-status.enum';
// import { GetTasksFilterDto } from './dto/get-task-filter.dto';

// @Injectable()
// export class TaskRepository extends Repository<Task> {
//     async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//       const { title, description } = createTaskDto;
//         const task = this.create({
//             title,
//             description,
//             status: TaskStatus.OPEN,
//         });
//         await this.save(task);
//         return task;
//     }

//     async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
//         const { status, search } = filterDto;
//         const query = this.createQueryBuilder('task');

//         if (status) {
//             query.andWhere('task.status = :status', { status });
//         }

//         if (search) {
//             query.andWhere(
//                 '(task.title LIKE :search OR task.description LIKE :search)',
//                 { search: `%${search}%` },
//             );
//         }

//         return await query.getMany();
//     }
//   }
//   // Bạn có thể thêm các method custom ở đây



// task.repository.ts
import { DataSource, Repository } from 'typeorm';
import { Task } from './dto/task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.save(task);
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(task.title LIKE :search OR task.description LIKE :search)',
                { search: `%${search}%` },
            );
        }

        return await query.getMany();
    }
}
