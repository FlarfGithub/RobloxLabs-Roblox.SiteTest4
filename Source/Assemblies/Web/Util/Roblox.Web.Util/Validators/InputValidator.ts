import { Profanity } from '../../../../DataV2/Filtering/Roblox.DataV2.Filtering/Profanity';
import { Whitespace } from '../../../../DataV2/Filtering/Roblox.DataV2.Filtering/Whitespace';
import { PredicateLoaders } from '../Factories/PredicateLoaders';

export class InputValidator {
	public CheckDoesNumberStringIncludeAlphaChars(input: string | number) {
		if (typeof input === 'number') {
			if (isNaN(input)) return true;
			return false;
		}
		if (!input) return false; // TODO Maybe do some extra response shit here?
		return input.match(/[a-zA-Z]+/g) === null;
	}

	public CheckDoesStringIncludeASPExtension(str: string) {
		str = str.toLowerCase();
		return str.endsWith('.aspx') || str.endsWith('.ashx') || str.endsWith('.asmx');
	}

	public CheckDoesStringIncludeInvalidChars(str: string) {
		return str.match(/^[A-Za-z0-9_-]*$/g) === null;
	}

	public CheckDoesStringIncludeProfanity(str: string) {
		let isInvalid = false;
		Profanity.every((p) => {
			if (str.match(p) !== null) {
				isInvalid = true;
				return false;
			}
			return true;
		});
		return isInvalid;
	}

	public CheckDoesStringIncludeWhitespace(str: string) {
		return PredicateLoaders.SomePredicate((char) => str.indexOf(char) > -1, Whitespace);
	}

	public CheckIfValueIsIncludedInArray<TValue>(value: TValue, array: TValue[]) {
		return array.indexOf(value) > -1;
	}

	public CheckIsDateStringAnISODate(str: string) {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
		var d = new Date(str);
		return d.toISOString() === str;
	}
}
