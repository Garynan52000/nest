import { registerAs } from "@nestjs/config";

export const CONFIG_APP = registerAs('app', () => {
    return {
        PORT: parseInt(process.env.APP_PORT, 10) || 3000        
    };
});
