import { Controller, HostParam, All } from '@nestjs/common';

/* 
    hosts 选项可以使用令牌来捕获主机名中该位置的动态值。
    @Controller() 下面的装饰器示例中的主机参数令牌演示了此用法。
    可以使用 @HostParam() 装饰器访问以这种方式声明的主机参数，该装饰器应添加到方法签名中。
*/
@Controller({
    path: 'apis/account',
    // host: ':account.example.com' 
})
export class AccountController {

    @All()
    getInfo(@HostParam('account') account: string): string {
        return account;
    }

}
