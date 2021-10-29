import { ArgumentException } from './ArgumentException';

export class ArgumentNullException extends ArgumentException {
	public constructor();

	public constructor(message: string);

	public constructor(message?: string) {
		super(message);
	}

	public name = 'ArgumentNullException';
}
