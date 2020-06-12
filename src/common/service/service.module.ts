import { Module } from "@nestjs/common";

export const COMMON_SERVICES = [
];

@Module({
    exports: COMMON_SERVICES,
})
export class ServiceModule {}
