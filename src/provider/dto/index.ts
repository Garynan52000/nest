import { IsInt } from "class-validator";

export class SetDefaultServiceValueDto {
    
    @IsInt()
    value: number;
    
}