import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {

    users: UserEntity[] = [
        new UserEntity({
            id: 0,
            uid: 'a',
            username: 'a',
            password: 'a',
            nickname: 'nick-a'
        }),
        new UserEntity({
            id: 1,
            uid: 'b',
            username: 'b',
            password: 'b',
            nickname: 'nick-b'
        }),
        new UserEntity({
            id: 2,
            uid: 'c',
            username: 'c',
            password: 'c',
            nickname: 'nick-c'
        })
    ]

    async findOne(inputStr: string | number): Promise<UserEntity | undefined> {
        return this.users.find(({id, uid, username}) => {
            return inputStr === id || 
                inputStr === uid || 
                inputStr === username;
        });
    }
    
}
