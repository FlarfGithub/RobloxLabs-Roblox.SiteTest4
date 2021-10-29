export class KeyValueMapping {
	public static BringKeyMapKeysToUppercase(value: Record<string, any>) {
		var key: any,
			keys: string[] = Object.keys(value);
		var n: int = keys.length;
		var newobj = {};
		while (n--) {
			key = keys[n];
			newobj[key.toUpperCase()] = value[key];
		}
		return newobj;
	}

	public static BringKeyMapKeysToLowerCase(value: Record<string, any>) {
		var key: any,
			keys: string[] = Object.keys(value);
		var n: int = keys.length;
		var newobj = {};
		while (n--) {
			key = keys[n];
			newobj[key.toLowerCase()] = value[key];
		}
		return newobj;
	}

	public static FetchKeyFromObjectCaseInsensitive<T = any>(object: { [x: string]: any }, key: string): T {
		return object[Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())];
	}

	public static FetchKeyFromObjectCaseInsensitiveOrDefault<T = any>(
		object: { [x: string]: any },
		key: string,
		defaultValue: T = null,
	): T {
		return object[Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())] || defaultValue;
	}

	public static FetchKeyFromObjectCaseInsensitiveGeneric<
		TObject extends any = any,
		TKey extends keyof TObject = any,
		TValue extends TObject[TKey] = any,
	>(object: TObject, key: TKey): TValue {
		return object[Object.keys(object).find((k) => k.toLowerCase() === (<string>key).toLowerCase())];
	}

	public static FetchKeyFromObjectCaseInsensitiveOrDefaultGeneric<
		TObject extends any = any,
		TKey extends keyof TObject = any,
		TValue extends TObject[TKey] = any,
	>(object: TObject, key: TKey, defaultValue: TValue = null): TValue {
		return object[Object.keys(object).find((k) => k.toLowerCase() === (<string>key).toLowerCase())] || defaultValue;
	}

	public static GetValueFromCookieString(valueName: string, cookieString: string): string {
		return KeyValueMapping.GetValuesFromCookieString([valueName], cookieString);
	}

	public static GetValuesFromCookieString(valueNames: string[], cookieString: string): string {
		let value = cookieString;
		if (value === undefined) value = '';
		value = value.split(';').find((val) => {
			for (let i = 0; i < valueNames.length; ++i) {
				if (val.startsWith(valueNames[i]) || val.startsWith(` ${valueNames[i]}`))
					return val.startsWith(valueNames[i]) || val.startsWith(` ${valueNames[i]}`);
			}
		});
		if (value) value = value.split('=')[1];
		return value || null;
	}

	public static GetValueFromFormString(valueName: string, formString: string): string {
		return KeyValueMapping.GetValuesFromFormString([valueName], formString);
	}

	public static GetValuesFromFormString(valueNames: string[], formString: string): string {
		let value = formString;
		if (value === undefined) value = '';
		value = value.split('&').find((val) => {
			for (let i = 0; i < valueNames.length; ++i) {
				if (val.startsWith(valueNames[i]) || val.startsWith(` ${valueNames[i]}`))
					return val.startsWith(valueNames[i]) || val.startsWith(` ${valueNames[i]}`);
			}
		});
		if (value) value = value.split('=')[1];
		return value || null;
	}
}
