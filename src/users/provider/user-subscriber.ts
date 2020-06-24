import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {

    constructor(conenction: Connection) {
        conenction.subscribers.push(this);
    }

    listenTo(): typeof UserEntity {
        return UserEntity;
    }

    beforeInsert(event: InsertEvent<UserEntity>): void {
        console.log(`BEFORE USER INSERTED: `, event.entity);
    }
    
}

/* 
    更多实体订阅者内容见这里。
    https://typeorm.io/#/listeners-and-subscribers/what-is-a-subscriber
*/