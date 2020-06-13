import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './timeout.interceptor';
import { ExcludeNullInterceptor } from './exclude-null.interceptor';
import { LoggingInterceptor } from './logging.interceptor';

export const LOGGING_INTERCEPTOR = {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
}

export const EXCLUDE_NULL_INTERCEPTOR = {
    provide: APP_INTERCEPTOR,
    useClass: ExcludeNullInterceptor,
}; 

export const TIMEOUT_INTERCEPTOR = {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
};

export const COMMON_INTERCEPTORES = [
    LOGGING_INTERCEPTOR,
    EXCLUDE_NULL_INTERCEPTOR,
    TIMEOUT_INTERCEPTOR
];

@Module({
    providers: COMMON_INTERCEPTORES
})
export class InterceptorModule {}
