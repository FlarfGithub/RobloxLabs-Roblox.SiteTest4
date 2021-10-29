export class Convert {
	public static ToInt16(value: any, radix?: int): short {
		return parseInt(value, radix);
	}

	public static ToUInt16(value: any, radix?: int): ushort {
		return parseInt(value, radix);
	}

	public static ToInt32(value: any, radix?: int): int {
		return parseInt(value, radix);
	}

	public static ToUInt32(value: any, radix?: int): uint {
		return parseInt(value, radix);
	}

	public static ToInt64(value: any, radix?: int): long {
		return parseInt(value, radix);
	}

	public static ToUInt64(value: any, radix?: int): ulong {
		return parseInt(value, radix);
	}

	public static ToBoolean(value: any, def?: bool): bool {
		if (typeof value === 'boolean') return value;

		const defaultReturn = def !== undefined && def !== null ? def : false;
		value = typeof value === 'string' ? value.toLowerCase() : null;
		if (value === null) return defaultReturn;
		try {
			return JSON.parse(value);
		} catch {
			return defaultReturn;
		}
	}
}
