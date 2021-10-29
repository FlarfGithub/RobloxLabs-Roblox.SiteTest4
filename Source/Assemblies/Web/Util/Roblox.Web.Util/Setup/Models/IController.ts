export function IController() {
	return function <T extends { new (...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			IsController = true;
			ControllerMethods = [];
		};
	};
}
