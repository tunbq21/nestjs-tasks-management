import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    // @Column()
    // email: string;
}
