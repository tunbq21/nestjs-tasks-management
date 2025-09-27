import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { create } from "domain";
import { User } from "./user.entity";

export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext) : User => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    },
);