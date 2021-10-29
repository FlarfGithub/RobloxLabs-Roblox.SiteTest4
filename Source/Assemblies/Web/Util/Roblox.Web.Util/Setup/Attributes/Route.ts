export function Route(name?: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		if (!target.ControllerMethods) target.ControllerMethods = [];
		const a = target.ControllerMethods;
		a.push({
			Name: propertyKey,
			Route: name || null,
			Function: descriptor.value,
		});
		target.ControllerMethods = a;
	};
}
