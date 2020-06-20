import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    @Inject()
    private readonly usersService: UsersService;
    
    @Inject()
    private readonly jwtService: JwtService

    async validateUser(inputUsername: string, inputPassword: string): Promise<UserEntity | null> {
        const user = await this.usersService.findOne({
            username: inputUsername,
            password: inputPassword
        });
        if (user) {
            const {
                password, ...result
            } = user;
            if (password === inputPassword) return result;
        }
        return null;
    }

    async login(user: UserEntity): Promise<any> {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
