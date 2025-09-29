import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ConfigService } from '@nestjs/config';


@Controller('tasks')
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(
        private tasksService: TasksService,
        // private configService: ConfigService,
    ) {
        // console.log('Config Service', this.configService.get('DATABASE_HOST'));
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`User "${user.username}" retrieving task with ID "${id}"`);
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UseGuards(AuthGuard())
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(createTaskDto, user);
    }
    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    @Get()
    @UseGuards(AuthGuard())
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }   
}
