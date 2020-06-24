import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorRepository, AuthorEntity } from './entity/author.entity';

@Injectable()
export class EntityRepositoryService {

    @InjectRepository(AuthorEntity)
    private readonly authorRepisitory :AuthorRepository

    constructor() { }

    async create(author: AuthorEntity): Promise<AuthorEntity> {
        const _author = this.authorRepisitory.create();
        _author.name = author.name;
        return this.authorRepisitory.save(author);
    }

    async createMany(authors: AuthorEntity[]): Promise<AuthorEntity[]> {
        const result: AuthorEntity[] = [];
        await this.authorRepisitory.manager.transaction(async () => {
            for (const author of authors) {
                let _author = this.authorRepisitory.create();
                _author.name = author.name;
                _author = await this.authorRepisitory.save(_author);
                result.push(_author);
            }
        });
        return result
    }

    async findOne(author: AuthorEntity): Promise<AuthorEntity> {
        return this.authorRepisitory.findOne(author);
    }

    async findAll(author?: AuthorEntity): Promise<AuthorEntity[]> {
        return this.authorRepisitory.find(author);
    }
    
}
