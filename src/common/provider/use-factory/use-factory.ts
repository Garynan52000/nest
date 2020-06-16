import { FactoryProvider } from "@nestjs/common";
import { DefaultService } from "../default/default.service";
import { USE_VALUE } from "../use-value/use-value";

/* 
    TIPS!! 
    注意引入的依赖 与 module 中注入的依赖
    来源于同一个 provider
    引入的路径需要一样！
    比如两个都叫 A ，索然类容是一样，但是路径不一样，也是不行的
    nest 无法识别的这是同一个东西，导致在注入池内无法找到依赖，报错

    可以尝试一下，会报错
    import { DefaultService } from "../";
    import { USE_VALUE } from "../";
*/

const provide = Symbol('USE_FACTORY');

const inject = [
    DefaultService,
    USE_VALUE
]

const useFactory = (
    defaultService: DefaultService,
    useValue = ''
): IUseFactory => {
    return { 
        get value() { 
            return defaultService.value 
        }, 
        useValue 
    }
};

export interface IUseFactory {
    value: number,
    useValue: string
}

export const USE_FACTORY = provide;

export const UseFactoryProvider: FactoryProvider<IUseFactory> = {
    provide,
    useFactory,
    inject
}
