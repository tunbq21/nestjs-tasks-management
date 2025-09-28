import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './dto/task.entity';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';

// @Module({
//   imports: [TypeOrmModule.forFeature([TaskRepository])],
//   controllers: [TasksController],
//   providers: [TasksService],
// })
// export class TasksModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule], // chỉ cần entity
  providers: [TasksService, TaskRepository],   // thêm custom repo vào providers
  controllers: [TasksController],
})
export class TasksModule {}

