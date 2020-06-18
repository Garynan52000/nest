import { Strategy } from "passport-local";
import { PassportStrategy } from '@nestjs/passport';
import { Inject, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserEntity } from "src/users/entity/user.entity";

export class LocalStrategy extends PassportStrategy(Strategy) {

    @Inject()
    private readonly authService: AuthService; 

    constructor(){
        super()
    }

    async validate(username: string, password: string): Promise<UserEntity> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
    }
    
}
