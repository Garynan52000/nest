import { Controller, Inject, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { IgnoreJWT } from 'src/auth/decorator/ignore-jwt-auth.decorator';
import { isUUID } from 'class-validator';

@Controller('apis/users')
export class UsersController {

    @Inject()
    private readonly userService: UsersService;

    constructor() {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @IgnoreJWT()
    async create(@Body() body: UserEntity | UserEntity[]): Promise<UserEntity | UserEntity[]> {
        const result = body instanceof Array ? 
            await this.userService.createMany(body) :
            await this.userService.create(body);
        return result;
    }

    @Get()
    async findAll(@Query() user: UserEntity): Promise<UserEntity[]> {
        return this.userService.findAll(user);
    }

    @Get(':id')
    async findOne(@Param() id: number | string): Promise<UserEntity> {
        const _isUUID = isUUID(id);
        return _isUUID ? 
            this.userService.findOne({uuid: id as string})
            : 
            this.userService.findOne({id: id as number})
    }

    @Delete(':id')
    async del(@Param() id: string): Promise<void> {
        await this.userService.remove(id);
    }

}
