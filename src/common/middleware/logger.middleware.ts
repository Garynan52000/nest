import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

	use(req: Request, res: Response, next: () => void): void {
		const { method, originalUrl, ip } = req;
		console.log('\n');
		console.log(new Date().toString());
		console.log(
			'Request: %s %s [IP: %s]', 
			method, 
			originalUrl,
			ip
		);
		next();
	}
	
}

/*
	我们使用的 LoggerMiddleware 类非常简单。它没有成员，没有额外的方法，没有依赖关系。
	  
	export function loggerMiddleware(req, res, next) {
		console.log(`Request...`);
		next();
	};
*/
