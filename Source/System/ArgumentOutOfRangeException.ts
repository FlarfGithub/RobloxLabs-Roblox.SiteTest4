import { ArgumentException } from './ArgumentException';

export class ArgumentOutOfRangeException extends ArgumentException {
	public constructor();

	public constructor(message: string);

	public constructor(message?: string) {
		super(message);
	}

	public name = 'ArgumentNullException';
}
