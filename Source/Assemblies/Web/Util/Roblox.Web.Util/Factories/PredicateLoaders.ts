export class PredicateLoaders {
	public static SomePredicate(predicate: (char: string) => boolean, listOfChars: string[]) {
		const len = listOfChars.length;
		for (let i = 0; i < len; i++) {
			if (predicate(listOfChars[i]) === true) {
				return true;
			}
		}
		return false;
	}
}
