import { Module } from "@nestjs/common";
import { CommonPipeModule } from "./pipe";
import { CommonInterceptorModule } from './interceptor';
import { CommonFilterModule } from "./filter";
import { CommonProviderModule } from "./provider";

@Module({
    imports: [
        CommonPipeModule,
        CommonInterceptorModule,
        CommonFilterModule,
        CommonProviderModule
    ]
})
export class CommonModule {}
