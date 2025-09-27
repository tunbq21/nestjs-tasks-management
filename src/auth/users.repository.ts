import { DataSource, Entity, In, Repository,  } from "typeorm";
import { User } from "./user.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        // hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // console.log('salt:', salt);
        // console.log('hashedPassword:', hashedPassword);

        // create a new user
        const user = this.create({ username, password: hashedPassword });
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new Error('Username already exists');
            }
            else {
                throw new InternalServerErrorException();
            }
            console.log(error);
        }
    }
}
