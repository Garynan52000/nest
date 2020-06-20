import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './auth/decorator/user.decorator';
import { UserEntity } from './users/entity/user.entity';
import { IgnoreJWT } from './auth/decorator/ignore-jwt-auth.decorator';

@Controller('apis')
export class AppController {

	@Inject()
	private readonly appService: AppService;

	constructor() { }

	@Get()
	@IgnoreJWT()
	main(@User() user: UserEntity): UserEntity {
		console.log(this.appService.getHello());
		return user;
	}
	
}
