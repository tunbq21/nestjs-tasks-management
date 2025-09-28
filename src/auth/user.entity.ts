import { IsString } from 'class-validator';
import { Task } from 'src/tasks/dto/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class User  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany((_type) => Task, task => task.user, { eager: true })
    tasks: Task[];
}
