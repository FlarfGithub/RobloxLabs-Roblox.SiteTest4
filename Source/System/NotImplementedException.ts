import { SystemException } from './SystemException';

export class NotImplementedException extends SystemException {
	public constructor();

	public constructor(message: string);

	public constructor(message?: string) {
		super(message, null);
	}
}
