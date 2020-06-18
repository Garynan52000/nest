import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';

// export const AUTH_GUARD = {
//     provide: APP_GUARD,
//     useClass: AuthGuard,
// };

const GUARDS = [
    // AUTH_GUARD  /* AuthGuard 不再使用， 用  src/auth/ 模块代替。 使用了 passport 认证库 */
];

@Module({
    providers: GUARDS
})
export class GuardModule {}
