import { SystemException } from './SystemException';

export class InvalidCastException extends SystemException {
	public constructor();

	public constructor(message: string);

	public constructor(message?: string) {
		super(message, null);
	}
}
