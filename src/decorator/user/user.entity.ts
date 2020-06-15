import { IsString, IsInt } from "class-validator";

export class UserEntity {

    @IsInt()
    readonly id: number = 1;
    
    @IsString()
    readonly uid: string = 'uid';

    @IsString()
    readonly nickname: string = 'nickname';

}
