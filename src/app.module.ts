import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
	imports: [CatsModule],
	controllers: [
		AppController,
		AccountController
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

	configure(consumer: MiddlewareConsumer) {
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
				{ path: 'account', method: RequestMethod.GET },
				{ path: 'account', method: RequestMethod.POST },
				'account/(.*)',
			)
			/* 
				可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类。
				.forRoutes( 'account', ... )		
				.forRoutes( { path: 'account', method: RequestMethod.ALL }, ... )		

				在大多数情况下，您可能只会传递一个由逗号分隔的控制器列表。
				.forRoutes( Controller, ... )
			*/
			.forRoutes(AccountController)
	}

}

