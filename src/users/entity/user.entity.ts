import { IsString, IsInt } from "class-validator";

export class UserEntity {

    @IsInt()
    id: number;

    @IsString()
    uid: string;

    @IsString()
    username: string;

    @IsString()
    password?: string;

    @IsString()
    nickname: string;

    constructor(user: UserEntity) {
        const {
            id, uid, username, password, nickname
        } = user;
        this.id = id;
        this.uid = uid;
        this.username = username;
        this.password = password;
        this.nickname = nickname;
    }
    
}