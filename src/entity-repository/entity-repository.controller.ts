import { Controller, Get, Param, Inject, ParseIntPipe, Query, Post, Body } from '@nestjs/common';
import { AuthorEntity } from './entity/author.entity';
import { EntityRepositoryService } from './entity-repository.service';

@Controller('apis/entity-repository')
export class EntityRepositoryController {

    @Inject()
    private readonly entitiRepositoryService: EntityRepositoryService;

    constructor() { }
    
    @Get()
    async findAll(@Query() author: AuthorEntity): Promise<AuthorEntity[]> {
        return this.entitiRepositoryService.findAll(author);
    }
    
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<AuthorEntity> {
        return this.entitiRepositoryService.findOne({id});
    }

    @Post()
    async create(@Body() body: AuthorEntity | AuthorEntity[]): Promise<AuthorEntity | AuthorEntity[]> {
        return body instanceof Array ? 
            await this.entitiRepositoryService.createMany(body) :
            await this.entitiRepositoryService.create(body);
    }
    
}
