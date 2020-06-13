import { Module } from "@nestjs/common";
import { FilterModule } from "./filter/filter.module";
import { PipeModule } from "./pipe";
import { ServiceModule } from "./service";
import { InterceptorModule } from './interceptor/interceptor.module';

@Module({
    imports: [
        FilterModule,
        PipeModule,
        ServiceModule,
        InterceptorModule
    ]
})
export class CommonModule {}
