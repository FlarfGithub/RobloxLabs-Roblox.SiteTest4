export class Guard {
	public static ArgumentNotNull(value: any, parameterName: string) {
		if (value === null) {
			throw new TypeError(`Null: ${parameterName}`);
		}
	}
}
