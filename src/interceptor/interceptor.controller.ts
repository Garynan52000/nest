import { Controller, Get, Query, ParseIntPipe, All } from '@nestjs/common';
import { IgnoreAuth } from 'src/guard/auth.guard';

@Controller('apis/interceptor')
export class InterceptorController {

    @Get('timeout')
    @IgnoreAuth()
    async timeout(
        @Query('ms', ParseIntPipe) ms: number
    ): Promise<void> {
        if (!(ms >= 0)) return;
        await new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    @All('exclude-null')
    @IgnoreAuth()
    excludeNull(): any {
        return null;
    }
    
}
