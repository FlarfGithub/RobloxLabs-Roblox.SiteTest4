import { Exception } from './Exception';

export class SystemException extends Exception {
	public constructor();

	public constructor(message: string, innerException: Exception);

	public constructor(message?: string, innerException?: Exception) {
		super(message, innerException);
	}
}
