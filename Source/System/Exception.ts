export class Exception extends Error {
	public constructor(message: string, innerException: Exception);

	public constructor(message?: string, innerException?: Exception) {
		super(message);
	}
}
