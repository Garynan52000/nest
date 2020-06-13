import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { IgnoreAuth } from './guard/auth.guard';

@Controller('apis')
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	@IgnoreAuth()
	getHello(@Req() request: Request): string {
		return this.appService.getHello();
	}
	
}
