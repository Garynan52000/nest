import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, ConfigType } from '@nestjs/config';
import { CONFIG_APP } from './config/config.app';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	/* 
		如果我们想一次性将中间件绑定到每个注册路由，我们可以使用由 INestApplication 实例提供的 use() 方法。
	  	app.use(middleware)
	*/
	const configService: ConfigService = app.get(ConfigService);
	const appConfig: ConfigType<typeof CONFIG_APP> = configService.get('app');
	// const port: ConfigType<typeof CONFIG_APP> = configService.get('app.PORT');
	console.log('app is listening on port %d.', appConfig.PORT);

	await app.listen(appConfig.PORT);
}

try {
	bootstrap();
} catch(err) {
	console.error('bootstrap with error: %s', err);
}
