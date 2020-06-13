import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CommonModule, LoggerMiddleware } from './common';
import { GuardModule } from './guard/guard.module';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { RedirectModule } from './redirect/redirect.module';
import { ExceptionModule } from './exception/exception.module';
import { InterceptorModule } from './interceptor/interceptor.module';

@Module({
	imports: [
		CommonModule,
		GuardModule,
		AccountModule,
		CatsModule,
		RedirectModule,
		ExceptionModule,
		InterceptorModule
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService
	],
})
/* 
	中间件不能在 @Module() 装饰器中列出。我们必须使用模块类的 configure() 方法来设置它们。
	包含中间件的模块必须实现 NestModule 接口。我们将 LoggerMiddleware 设置在 ApplicationModule 层上。
*/
export class AppModule implements NestModule {

	configure(consumer: MiddlewareConsumer): void {
		consumer
			/* 
				可以使用多个参数来指定多个多个中间件。
				.apply( Middleware, ... )
			*/
			.apply(LoggerMiddleware)
			/* 
				排除某些路线。方法可以采用一个字符串，多个字符串或一个 RouteInfo 对象来标识要排除的路由。
				.exclude( 'account', ... )		
				.exclude( { path: 'account', method: RequestMethod.ALL }, ... )	
			*/
			.exclude(
				{ path: 'apis/account', method: RequestMethod.POST },
				'apis/account/(.+)',
			)
			/* 
				可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类。
				.forRoutes( 'account', ... )		
				.forRoutes( { path: 'account', method: RequestMethod.ALL }, ... )		

				在大多数情况下，您可能只会传递一个由逗号分隔的控制器列表。
				.forRoutes( Controller, ... )
			*/
			.forRoutes('apis')
	}

}

