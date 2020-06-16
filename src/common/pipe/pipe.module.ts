import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { MyValidationPipe } from "./my-validation.pipe";

export const MY_VALIDATION_PIPE = {
    provide: APP_PIPE,
    useClass: MyValidationPipe
}

export const COMMON_PIPES = [
    MY_VALIDATION_PIPE
];

@Module({
    providers: COMMON_PIPES
})
export class CommonPipeModule {};
