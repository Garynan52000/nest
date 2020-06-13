import { Module } from "@nestjs/common";
import { PipeModule } from "./pipe";
import { InterceptorModule } from './interceptor/interceptor.module';
import { FilterModule } from "./filter/filter.module";
import { ServiceModule } from "./service";

@Module({
    imports: [
        PipeModule,
        InterceptorModule,
        FilterModule,
        ServiceModule
    ]
})
export class CommonModule {}
