import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository,AuthorEntity } from './entity/author.entity';
import { EntityRepositoryController } from './entity-repository.controller';
import { EntityRepositoryService } from './entity-repository.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AuthorEntity,
            AuthorRepository
		])
    ],
    providers: [
        EntityRepositoryService
    ],
    exports: [
        /* 
			如果要在导入 TypeOrmModule.forFeature 的模块之外使用存储库，则需要重新导出由其生成的提供程序。 
			您可以通过导出整个模块来做到这一点。
		*/
		// TypeOrmModule,
        EntityRepositoryService
    ],
    controllers: [EntityRepositoryController],
})
export class EntityRepositoryModule {}
