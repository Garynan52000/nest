import { Controller, Post, UseGuards, Inject, Body } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { IgnoreJWT } from './decorator/ignore-jwt-auth.decorator';
import { User } from './decorator/user.decorator';

@Controller('apis/auth')
export class AuthController {

    @Inject()
    private readonly authService: AuthService; 

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @IgnoreJWT()
    async login(@User() body: UserEntity): Promise<UserEntity> {
        return this.authService.login(body);
    }
    
}

/* 
    确保应用程序正在运行，并使用 cURL 测试路由。

    $ # GET apis/xxx/xxx
    $ curl http://localhost:3000/apis/xxx/xxx
    $ # result -> {"statusCode":401,"error":"Unauthorized"}

    $ # POST apis/auth/login
    $ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
    $ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }

    $ # GET apis/xxx/xxx using access_token returned from previous step as bearer code
    $ curl http://localhost:3000/apis/xxx/xxx -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
    $ # result -> {"userId":1,"username":"john"}
*/