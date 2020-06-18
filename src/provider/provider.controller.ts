import { Controller, Inject, Get, Put, Body } from '@nestjs/common';
import { SetDefaultServiceValueDto } from './dto';
import { DefaultService, USE_VALUE, USE_FACTORY, IUseFactory } from 'src/common';
import { ASYNC } from 'src/common/provider/async/async';
import { IgnoreJWT } from 'src/auth/decorator/ignore-jwt-auth.decorator';

@Controller('apis/provider')
export class ProviderController {

    @Inject()
    private readonly defaultService: DefaultService;
    
    @Inject(USE_VALUE)
	private readonly useValue: string;
    
    @Inject(USE_FACTORY)
    private readonly useFactory: IUseFactory;
    
    @Inject('USE_VALUE_ALIAS')
    private readonly useValueAlias: string;

    @Inject(ASYNC)
    private readonly asyncMsg: string;

    @Get('default-service')
    @IgnoreJWT()
    getDefaultServiceValue(): number {
        return this.defaultService.value;
    }

    @Put('default-service')
    @IgnoreJWT()
    setDefaultServiceValue(
        @Body() body: SetDefaultServiceValueDto
    ): void {
        this.defaultService.setValue(body.value);
    }

    @Get('use-value')
    @IgnoreJWT()
    getUseValue(): string {
        return this.useValue;
    }

    @Get('use-factory')
    @IgnoreJWT()
    getUseFactory(): IUseFactory {
        return this.useFactory;
    }

    @Get('use-value-alias')
    @IgnoreJWT()
    getUseValueAlias(): string {
        return this.useValueAlias;
    }

    @Get('async')
    @IgnoreJWT()
    doAsync(): string {
        return this.asyncMsg;
    }
    
}
