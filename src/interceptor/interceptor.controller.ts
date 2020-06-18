import { Controller, Get, Query, ParseIntPipe, All } from '@nestjs/common';
import { IgnoreJWT } from 'src/auth/decorator/ignore-jwt-auth.decorator';

@Controller('apis/interceptor')
export class InterceptorController {

    @Get('timeout')
    @IgnoreJWT()
    async timeout(
        @Query('ms', ParseIntPipe) ms: number
    ): Promise<void> {
        if (!(ms >= 0)) return;
        await new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    @All('exclude-null')
    @IgnoreJWT()
    excludeNull(): any {
        return null;
    }
    
}
