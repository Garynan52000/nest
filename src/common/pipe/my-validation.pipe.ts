import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {

	async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<any> {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			const message = 'Validation failed'; 
			const details = errors.reduce((obj, err) => {
				const { property, constraints } = err;
				obj[property] = constraints;
				return obj;
			}, {});
			throw new BadRequestException({
				message,
				details 
			});
		}
		return value;
	}

	private toValidate(metatype: any): boolean {
		const types = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}

}
