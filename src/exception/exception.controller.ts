import { Controller, All, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { IgnoreJWT } from 'src/auth/decorator/ignore-jwt-auth.decorator';

@Controller('apis/exception')
/* 
	控制器范围绑定过滤器
*/
// @UseFilters(new HttpExceptionFilter())
export class ExceptionController {

	@All('buildin')
	@IgnoreJWT()
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

	@All('filter')
	/* 
		绑定过滤器
		@UseFilters(new HttpExceptionFilter())
		@UseFilters(HttpExceptionFilter)

		尽可能使用类而不是实例。由于 Nest 可以轻松地在整个模块中重复使用同一类的实例，因此可以减少内存使用。
	*/
	// @UseFilters(HttpExceptionFilter)
	@IgnoreJWT()
	httpExceptionFilter(): void {
		throw new ForbiddenException();
	}

	@All('runtime')
	@IgnoreJWT()
	runtimeException(): void {
		let a;
		a.do();
	}
    
}
