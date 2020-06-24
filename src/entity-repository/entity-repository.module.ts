import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './entity/author.entity';
import { EntityRepositoryController } from './entity-repository.controller';
import { EntityRepositoryService } from './entity-repository.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
			AuthorRepository
		])
    ],
    controllers: [EntityRepositoryController],
    providers: [EntityRepositoryService]
})
export class EntityRepositoryModule {}
