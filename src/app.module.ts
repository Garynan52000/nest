import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CommonModule, LoggerMiddleware } from './common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GuardModule } from './guard/guard.module';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { RedirectModule } from './redirect/redirect.module';
import { ExceptionModule } from './exception/exception.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { ProviderModule } from './provider/provider.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		CommonModule,
		AuthModule,
		UsersModule,
		GuardModule,
		AccountModule,
		CatsModule,
		RedirectModule,
		ExceptionModule,
		InterceptorModule,
		ProviderModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'xx123456',
			database: 'test',
			entities: [
				'dist/**/*.entity{.ts,.js}'
			],
			synchronize: true
			/*  
				其他一些额外的配置参数描述如下：
				参数	说明
				retryAttempts  重试连接数据库的次数 （默认：10）
				retryDelay	两次重试连接的间隔 (ms) （默认：3000）
				autoLoadEntities  如果为 true ,将自动加载实体 (默认： false )
				keepConnectionAlive  如果为 true ，在应用程序关闭后连接不会关闭（默认： false )
				@link https://typeorm.io/#/connection-options
			*/
		}),
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService
	]
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

