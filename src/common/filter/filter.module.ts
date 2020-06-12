import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { BasicExceptionFilter } from "./basic-exception.filter";
import { HttpExceptionFilter } from "./http-exception.filter";

export const BASIC_EXCEPTION_FILTER = 	{
	provide: APP_FILTER,
	useClass: BasicExceptionFilter,
};

export const HTTP_EXCEPTION_FILTER = 	{
	provide: APP_FILTER,
	useClass: HttpExceptionFilter,
};

export const COMMON_FILTERS = [
    BASIC_EXCEPTION_FILTER,
    HTTP_EXCEPTION_FILTER
];

@Module({
    providers: COMMON_FILTERS
})
export class FilterModule {}