import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './provider/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './const';
import { JwtStrategy } from './provider/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';



@Module({
	imports: [
		PassportModule.register({ 
			defaultStrategy: 'jwt' 
		}),
		JwtModule.register({
			secret: JWT_CONSTANTS.secret,
			signOptions: { expiresIn: '60s' },
		}),
		UsersModule,
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	],
	exports: [
		AuthService
	],
	controllers: [AuthController]
})
export class AuthModule { }
