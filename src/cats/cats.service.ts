import { Injectable } from '@nestjs/common';
import { CatEntity } from './entity/cat.entity';

@Injectable()
export class CatsService {

    private readonly cats: CatEntity[] = [];

    create(cat: CatEntity): void {
        this.cats.push(cat);
    }

    findAll(): CatEntity[] {
        return this.cats;
    }
    
}
