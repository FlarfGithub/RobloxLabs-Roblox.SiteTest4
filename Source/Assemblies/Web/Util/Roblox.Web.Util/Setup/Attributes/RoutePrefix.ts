export function RoutePrefix(prefix?: string) {
	return function <T extends { new (...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			Route = prefix || null;
		};
	};
}
