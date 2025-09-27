import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
constructor(
private usersRepository: UsersRepository,
private jwtService: JwtService,
) {}

async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        // find the user by username
        const user = await this.usersRepository.findOne({ where: { username } });
        // if user exists and password is correct
        if (user && await bcrypt.compare(password, user.password)) {
        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
        }
        else {
        throw new UnauthorizedException('Invalid credentials');
        }

        }
        }
