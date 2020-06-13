import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, SetMetadata, CustomDecorator } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

const META_KEY = 'isIgnoreAuth';

export const IgnoreAuth = (): CustomDecorator => SetMetadata(META_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isIgnoreAuth = this.reflector.get<boolean>(META_KEY, context.getHandler());
		return isIgnoreAuth || this.doAuth(context);
	}

	private async doAuth(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const token = request.header('x-auth-token');
		
		if (!token) {
			throw new UnauthorizedException();
		} 
		return true;
	}

}
