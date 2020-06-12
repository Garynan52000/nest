import { Controller, Get, Redirect, Query } from '@nestjs/common';

@Controller('apis/redirect')
export class RedirectController {

    @Get()
	@Redirect('http://www.baidu.com', 302) // 默认重定向到该地址，并返回 302 
	link(@Query('url') url?: string): { url: string} {
		/* 
		  有时您可能想动态确定HTTP状态代码或重定向URL。通过从路由处理程序方法返回一个形状为以下形式的对象：
		  {
			"url": string,
			"statusCode": number
		  }
		  返回的值将覆盖传递给 @Redirect()装饰器的所有参数。
		*/
		if (url) { // 如果用户指定了 url ，重定向到该 url
			return { url };
		}
	}

}
