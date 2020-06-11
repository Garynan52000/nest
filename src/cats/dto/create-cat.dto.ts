/**
 * DTO 是一个对象，它定义了网络请求的入参格式和类型
 */

import { Cat } from "../interface/cat.interface";
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto implements Cat {

    @IsString()
    readonly name: string;

    @IsInt()
    readonly age: number;

    @IsString()
    readonly breed: string;
    
}