import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>

    /**
     * 创建
     * @param user 
     */
    async create(user: UserEntity): Promise<UserEntity> {
        return this.usersRepository.save(user);
    }    

    /**
     * 查询所有
     */
    async findAll(user: UserEntity): Promise<UserEntity[]> {
        return this.usersRepository.find(user);
    }

    /**
     * 查找一个
     * @param id 
     */
    async findOne(user: UserEntity): Promise<UserEntity> {
        return this.usersRepository.findOne(user);
    }

    /**
     * 删除
     * @param id 
     */
    async remove(id: unknown): Promise<void> {
        await this.usersRepository.delete(id);
    }
    
}
