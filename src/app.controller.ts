import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { IgnoreAuth } from './guard/auth.guard';
import { User, UserEntity } from './decorator/user';

@Controller('apis')
export class AppController {

	@Inject()
	private readonly appService: AppService;

	constructor() { }

	@Get()
	@IgnoreAuth()
	main(@User() user: UserEntity): UserEntity {
		console.log(this.appService.getHello());
		return user;
	}
	
}
