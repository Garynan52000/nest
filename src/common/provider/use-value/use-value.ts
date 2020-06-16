import { ValueProvider } from "@nestjs/common";

const provide = Symbol('USE_VALUE');

const useValue = 'useValue';

export const USE_VALUE = provide;

export const UseValueProvider: ValueProvider<string> = {
    provide,
    useValue
}
