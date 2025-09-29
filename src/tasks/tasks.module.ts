import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './dto/task.entity';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';
// import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    // ConfigModule,
    TypeOrmModule.forFeature([Task]),
    AuthModule,
  ],
  providers: [TasksService, TaskRepository],
  controllers: [TasksController],
})
export class TasksModule {}

// @Module({
//   imports: [TypeOrmModule.forFeature([TaskRepository])],
//   controllers: [TasksController],
//   providers: [TasksService],
// })
// export class TasksModule {}
