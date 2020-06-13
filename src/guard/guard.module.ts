import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

export const AUTH_GUARD = {
    provide: APP_GUARD,
    useClass: AuthGuard,
};

const GUARDS = [
    AUTH_GUARD
];

@Module({
    providers: GUARDS
})
export class GuardModule {}
