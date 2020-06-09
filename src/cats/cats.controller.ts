import { Controller, Get, Req, Post, HttpCode, Header, Param, Body, HttpStatus } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {

    constructor(
        private readonly catsService: CatsService
    ) {};

    @Post()
    @HttpCode(HttpStatus.CREATED) // 默认情况下，响应的状态码总是200，除了 POST 请求外，此时它是201，我们可以通过在处理程序层添加@HttpCode（...） 装饰器来轻松更改此行为。
    @Header('Cache-Control', 'none') // 要指定自定义响应头，可以使用 @header() 修饰器或类库特有的响应对象,（使用 并 res.header()直接调用）。
    create(@Body() createCatDto: CreateCatDto): void {
        this.catsService.create(createCatDto);
    }
    // create(@Res() res: Response) {
    //     res.status(HttpStatus.CREATED).send();
    // }
    
    @Get()
    async findAll(): Promise<any[]> {
        return this.catsService.findAll();
    }
    // 也可以返回 rxjs 的 Observable
    // findAll(): Observable<any[]> {
    //     return of([]);
    // }

    @Get(':id') // 路由参数
    // findOne(@Param() params): string {
    //     console.log(params);
    //     return `This action returns a #${params.id} cat`;
    // }
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }
    
}
