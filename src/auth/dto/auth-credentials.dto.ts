// import { Column, Entity } from "typeorm";

import { IsString, Matches, MaxLength, MinLength } from "class-validator";


// @Entity()
export class AuthCredentialsDto {
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    username: string;
    
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;
}
