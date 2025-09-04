import { IsEnum, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class UpdateTaskStatusDto {
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}