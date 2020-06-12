import { Module } from "@nestjs/common";
import { FilterModule } from "./filter/filter.module";
import { PipeModule } from "./pipe";
import { ServiceModule } from "./service";

@Module({
    imports: [
        FilterModule,
        PipeModule,
        ServiceModule
    ]
})
export class CommonModule {}
