import { Controller, Get, Redirect, Query, Req, All, HttpException, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { HttpExceptionFilter } from './common/filtter/http-exception.filter';


@Controller('apis')
/* 
	控制器范围绑定过滤器
*/
// @UseFilters(new HttpExceptionFilter())
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getHello(@Req() request: Request): string {
		return this.appService.getHello();
	}

	@Get('link')
	@Redirect('http://www.baidu.com', 302) // 默认重定向到该地址，并返回 302 
	link(@Query('url') url?: string): { url: string} {
		/* 
		  有时您可能想动态确定HTTP状态代码或重定向URL。通过从路由处理程序方法返回一个形状为以下形式的对象：
		  {
			"url": string,
			"statusCode": number
		  }
		  返回的值将覆盖传递给 @Redirect()装饰器的所有参数。
		*/
		if (url) { // 如果用户指定了 url ，重定向到该 url
			return { url };
		}
	}

	@All('http-exception')
	httpException(): void {
		/* 
			内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。
			开箱即用，此操作由内置的全局异常过滤器执行，该过滤器处理类型 HttpException（及其子类）的异常。
			每个发生的异常都由全局异常过滤器处理, 当这个异常无法被识别时 (既不是 HttpException 也不是继承的类 HttpException ) , 用户将收到以下 JSON 响应:
			{
				"statusCode": 500,
				"message": "Internal server error"
			}

			第一个为响应主体， 支持 JSON Object 格式  
			throw new HttpException({
				status: HttpStatus.FORBIDDEN,
				error: 'This is a custom message',
			}, HttpStatus.FORBIDDEN);

			内置 HTTP 异常 
			https://docs.nestjs.cn/7/exceptionfilters?id=%e5%86%85%e7%bd%aehttp%e5%bc%82%e5%b8%b8
		*/
		throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
	}

	@All('http-exception-filter')
	/* 
		绑定过滤器
		@UseFilters(new HttpExceptionFilter())
		@UseFilters(HttpExceptionFilter)

		尽可能使用类而不是实例。由于 Nest 可以轻松地在整个模块中重复使用同一类的实例，因此可以减少内存使用。
	*/
	// @UseFilters(HttpExceptionFilter)
	httpExceptionFilter(): void {
		throw new ForbiddenException();
	}

	@All('runtime-exception')
	runtimeException(): void {
		let a;
		a.do();
	}
	
}
