/**
 * 基础异常过滤器
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MESSAGES } from '@nestjs/core/constants';

@Catch()
export class BasicExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost): void { 
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
		const message = exception && exception['message'] ? 
			exception['message'] : MESSAGES.UNKNOWN_EXCEPTION_MESSAGE;
		const path = request.baseUrl;
		const timestamp = Date.now().valueOf();
		
		response
			.json({
				statusCode,
				message,
				path,
				timestamp
			});
	}
}
