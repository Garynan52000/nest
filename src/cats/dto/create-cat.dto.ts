import { Cat } from "../interface/cat.interface";

/**
 * DTO 是一个对象，它定义了如何通过网络发送数据。
 */
export class CreateCatDto implements Cat {
    readonly name: string;
    readonly age: number;
    readonly breed: string;
}