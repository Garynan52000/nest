import { Controller, Get, Req, Post, HttpCode, Header, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Post()
    @HttpCode(204) // 默认情况下，响应的状态码总是200，除了 POST 请求外，此时它是201，我们可以通过在处理程序层添加@HttpCode（...） 装饰器来轻松更改此行为。
    @Header('Cache-Control', 'none') // 要指定自定义响应头，可以使用 @header() 修饰器或类库特有的响应对象,（使用 并 res.header()直接调用）。
    create(): string {
        return 'This action adds a new cat';
    }
    
    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }

    @Get(':id') // 路由参数
    // findOne(@Param() params): string {
    //     console.log(params);
    //     return `This action returns a #${params.id} cat`;
    // }
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} cat`;
    }
    
}
