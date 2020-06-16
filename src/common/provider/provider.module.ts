import { Module, Provider } from "@nestjs/common";
import { DefaultService } from "./default/default.service";
import { UseValueProvider, USE_VALUE } from "./use-value/use-value";
import { UseFactoryProvider } from "./use-factory/use-factory";
import { asyncProvider } from "./async/async";

const COMMON_PROVIDER: Provider[] = [
    DefaultService,
    UseValueProvider,
    UseFactoryProvider,
    {   // 别名
        provide: 'USE_VALUE_ALIAS',
        useExisting: USE_VALUE
    },
    asyncProvider
]

@Module({
    providers: COMMON_PROVIDER,
    exports: COMMON_PROVIDER 
})
export class CommonProviderModule { }
