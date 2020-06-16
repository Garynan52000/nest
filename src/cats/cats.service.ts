import { Injectable } from '@nestjs/common';
import { CreateEntity } from './entity/cat.entity';

@Injectable()
export class CatsService {

    private readonly cats: CreateEntity[] = [];

    create(cat: CreateEntity): void {
        this.cats.push(cat);
    }

    findAll(): CreateEntity[] {
        return this.cats;
    }
    
}
