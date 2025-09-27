import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { JwtPayload } from "./jwt-payload.interface";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) { 
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload) {
        const { username } = payload;
        const user = await this.usersRepository.findOne({ where: { username } });
        if (!user) { 
            throw new UnauthorizedException();
        }
        return user;
    }   

    // async validate(payload: any) {
    //     const user = await this.usersRepository.findOne(payload.sub);
    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }           
    //     return user;
    // }
}