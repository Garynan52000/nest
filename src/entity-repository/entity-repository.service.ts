import { Injectable, Inject } from '@nestjs/common';
import { AuthorRepository, AuthorEntity } from './entity/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EntityRepositoryService {

    @Inject()
    private readonly authorRepository: AuthorRepository
    
    constructor() { }

    async create(author: AuthorEntity): Promise<AuthorEntity> {
        const _author = this.authorRepository.create();
        _author.name = author.name;
        return this.authorRepository.save(author);
    }

    async createMany(authors: AuthorEntity[]): Promise<AuthorEntity[]> {
        const result: AuthorEntity[] = [];
        await this.authorRepository.manager.transaction(async () => {
            for (const author of authors) {
                let _author = this.authorRepository.create();
                _author.name = author.name;
                _author = await this.authorRepository.save(_author);
                result.push(_author);
            }
        });
        return result
    }

    async findOne(author: AuthorEntity): Promise<AuthorEntity> {
        return this.authorRepository.findOne(author);
    }

    async findAll(author?: AuthorEntity): Promise<AuthorEntity[]> {
        return this.authorRepository.find(author);
    }
    
}
