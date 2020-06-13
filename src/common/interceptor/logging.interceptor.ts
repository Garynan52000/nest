import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const date = new Date(); 

		console.log('Start at [%s]', date.toString());
		return next.handle()
			.pipe(
				tap(() => {
					console.log('Cost %dms', Date.now() - date.valueOf());
				})
			);
	}

}
