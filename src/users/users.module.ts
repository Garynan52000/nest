import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserEntity
		])
	],
	providers: [
		UsersService
	],
	exports: [
		/* 
			如果要在导入 TypeOrmModule.forFeature 的模块之外使用存储库，则需要重新导出由其生成的提供程序。 
			您可以通过导出整个模块来做到这一点。
		*/
		// TypeOrmModule,
		UsersService
	],
	controllers: [UsersController]
})
export class UsersModule { }
