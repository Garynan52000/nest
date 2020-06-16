import { FactoryProvider } from "@nestjs/common";

const provide = Symbol('ASYNC');

const useFactory = async () => {
    await new Promise((resolve) => {
        let loadtime = 5000;
        function load() {
            console.log('asyncProvider will ready in %ds!', loadtime / 1000); 
            loadtime -= 1000
            setTimeout(() => {
                if (loadtime < 0) resolve();
                else load();
            }, 1000)
        }
        load();
    });
    console.log('asyncProvider ready!');
    return 'asyncProvider ready!';
}

export const ASYNC = provide;

export const asyncProvider: FactoryProvider = {
    provide,
    useFactory
}
