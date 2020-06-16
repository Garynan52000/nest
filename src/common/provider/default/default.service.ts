import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultService {
    
    private _value = 0;

    get value(): number {
        return this._value;
    }

    setValue(value: number): void {
        this._value = value;
    }
    
}
