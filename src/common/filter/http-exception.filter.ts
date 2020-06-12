/**
 * http 异常过滤器
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		const statusCode = exception.getStatus();
		const message = exception.message;
		const path = request.originalUrl;
		const timestamp = Date.now();
		const defaultJsonData = {
			statusCode,
			message,
			path,
			timestamp,
		};

		let jsonData;
		try {
			jsonData = exception['getResponse']();
			if (Object.prototype.toString.call(jsonData) === '[object Object]') {
				jsonData = Object.assign(defaultJsonData, jsonData);
			} else {
				jsonData = defaultJsonData;
			}
		} catch {
			jsonData = defaultJsonData;
		}

		response
			.status(statusCode)
			.json(jsonData);
	}
}

/*
	所有异常过滤器都应该实现通用的 ExceptionFilter<T> 接口。
	它需要你使用有效签名提供 catch(exception: T, host: ArgumentsHost)方法。T 表示异常的类型。

	@Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找 HttpException 而不是其他的。
	在实践中，@Catch() 可以传递多个参数，所以你可以通过逗号分隔来为多个类型的异常设置过滤器。
*/