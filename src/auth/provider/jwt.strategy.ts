import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
import { JWT_CONSTANTS } from '../const';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    @Inject()
    private readonly userService: UsersService;
    
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANTS.secret
        });
    }

    async validate(payload: {sub: string, username: string}): Promise<UserEntity> {
        const user = await this.userService.findOne(payload.sub || payload.username);
        if (user) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

}