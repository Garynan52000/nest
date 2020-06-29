import { registerAs } from "@nestjs/config";

export const CONFIG_MYSQL = registerAs('mysql', () => {
    return {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'xx123456',
        database: 'test',
        /* 通过配置这一选项，每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中。 */
        autoLoadEntities: true,
        synchronize: true
        /*  
            其他一些额外的配置参数描述如下：
            参数	说明
            retryAttempts  重试连接数据库的次数 （默认：10）
            retryDelay	两次重试连接的间隔 (ms) （默认：3000）
            autoLoadEntities  如果为 true ,将自动加载实体 (默认： false )
            keepConnectionAlive  如果为 true ，在应用程序关闭后连接不会关闭（默认： false )
            @link https://typeorm.io/#/connection-options
        */
    };
});
