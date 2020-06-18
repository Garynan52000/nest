import { Injectable, Inject, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JWT_CONSTANTS } from '../const';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    @Inject()
    private readonly reflector: Reflector

    canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isIgnoreJWT = this.reflector.get<boolean>(JWT_CONSTANTS.metaKey, context.getHandler());
		return isIgnoreJWT || super.canActivate(context);
	}
    
}
