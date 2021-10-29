import { Request, Response } from 'express';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { DFLog, FASTLOG3 } from '../../Util/Roblox.Web.Util/Logging/FastLog';
import { HttpRequestMethodEnum } from '../../../Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { WebParsers } from './WebParsers';

export class WebControllerParsers {
	public static ControllerMethodParser(app: IApplicationBuilder, controller: any, apiName: string) {
		if (!controller) return false;
		const controllerName: string = (controller.Name || '').toString();
		let routePrefix: string = (controller.Route || '').toString();
		if (!routePrefix) routePrefix = controllerName.toLocaleLowerCase().replace('controller', '');
		if (!routePrefix.startsWith('/')) routePrefix = '/' + routePrefix;
		if (!routePrefix.endsWith('/')) routePrefix = routePrefix + '/';
		const prefixParams = routePrefix.match(/\[(.*?)\]/);
		if (prefixParams)
			for (const param of prefixParams) {
				routePrefix = routePrefix.replace(`[${param}]`, `:${param}`);
			}
		const ControllerMethods = new Map(Object.entries(controller));
		ControllerMethods.forEach((controllerMethod: any) => {
			if (typeof controllerMethod !== 'object') return;
			let name: string = (controllerMethod.Name || '').toString();
			let route: string = (controllerMethod.Route || '').toString();
			if (!route) {
				if (name.toLocaleLowerCase() === 'index') {
					route = routePrefix;
				} else {
					if (name.startsWith('/')) name = name.replace('/', '');
					if (name.endsWith('/')) name = WebParsers.StripTheTrailingSlash(name);
					route = routePrefix + name.toLocaleLowerCase();
				}
			}
			const params = route.match(/\[(.*?)\]/);
			if (params)
				for (const param of params) {
					route = route.replace(`[${param}]`, `:${param}`);
				}

			if (routePrefix !== controllerName.toLocaleLowerCase().replace('controller', ''))
				route = WebParsers.StripTheTrailingSlash(routePrefix) + route;
			FASTLOG3(
				DFLog('Tasks'),
				`[DFLog::Tasks] Parsing the Controller method 'https://%s%s' for the Controller '%s'.`,
				apiName,
				route,
				controller.Name,
			);

			/* Method */
			const method: HttpRequestMethodEnum = controllerMethod.Method;
			const func =
				controllerMethod.Function ||
				((_request: Request, _response: Response) => {
					throw new Error('This endpoint is not implemented yet.');
				});
			if (method === undefined) {
				const methods: string[] = controllerMethod.Methods || null;
				const badRequestMethodHandler = controllerMethod.BadRequestMethodHandler || null;
				if (!methods) {
					app.all(route, func);
				} else if (methods) {
					app.all(route, (request, response, next) => {
						let badRequestMethod = true;
						methods.forEach((method) => {
							if (request.method.toLocaleLowerCase() === method.toLocaleLowerCase()) badRequestMethod = false;
						});
						if (badRequestMethodHandler && badRequestMethod) return badRequestMethodHandler(request, response, next);
						// TODO: Make the badRequestMethodHandler required for multi-methods.
						return func(request, response, next);
					});
				}
			} else {
				switch (<HttpRequestMethodEnum>method) {
					case HttpRequestMethodEnum.GET:
						app.get(route, func);
						break;
					case HttpRequestMethodEnum.DELETE:
						app.delete(route, func);
						break;
					case HttpRequestMethodEnum.HEAD:
						app.head(route, func);
						break;
					case HttpRequestMethodEnum.OPTIONS:
						app.options(route, func);
						break;
					case HttpRequestMethodEnum.PATCH:
						app.patch(route, func);
						break;
					case HttpRequestMethodEnum.POST:
						app.post(route, func);
						break;
					case HttpRequestMethodEnum.PUT:
						app.put(route, func);
						break;
				}
			}
		});
	}
}
