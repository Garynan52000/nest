import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {

    @Inject()
    private readonly connection: Connection;

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>

    /**
     * 创建
     * @param user 
     */
    async create(user: UserEntity): Promise<UserEntity> {
        const _user = this.usersRepository.create(); 
        _user.username = user.username; 
        _user.password = user.password;
        return this.usersRepository.save(_user);
    }

    /**
     * 创建多个 
     * (事务)
     * @param users 
     */
    async createMany(users: UserEntity[]): Promise<UserEntity[]> {
        const result: UserEntity[] = [];
        
        // const queryRunner = this.connection.createQueryRunner();

        // await queryRunner.connect();
        // await queryRunner.startTransaction();
        // try {
        // for (const user of users) {
        //     let _user = this.usersRepository.create(); 
        //     _user.username = user.username; 
        //     _user.password = user.password; 
        //     _user = await queryRunner.manager.save(_user);
        //     result.push(_user);
        // }
        //     await queryRunner.commitTransaction();
        // } catch (err) {
        //     //如果遇到错误，可以回滚事务
        //     await queryRunner.rollbackTransaction();
        // } finally {
        //     //你需要手动实例化并部署一个queryRunner
        //     await queryRunner.release();
        //     return result;
        // }

        /* 简写。 更多 transaction 用法 https://typeorm.io/#/transactions/creating-and-using-transactions */
        // this.usersRepository.manager.transaction  
        await this.connection.transaction(async manager => {
            for (const user of users) {
                let _user = this.usersRepository.create(); 
                _user.username = user.username; 
                _user.password = user.password; 
                _user = await manager.save(_user);
                result.push(_user);
            }
        });
        return result;
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
