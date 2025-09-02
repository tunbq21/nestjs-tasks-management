import { IsEnum, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class UpdateTaskStatusDto {
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}