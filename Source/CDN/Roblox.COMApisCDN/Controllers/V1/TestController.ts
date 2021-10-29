import { NextFunction, Request, Response } from 'express';
import { HttpRequestMethodEnum } from '../../../../Assemblies/Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';

export namespace Roblox.ComApis.Api.Controllers.V1 {
	export const TestController = {
		Name: 'TestController',
		IsController: true,
		Index: {
			Name: 'Index',
			Route: '/test',
			Function: (request: Request, response: Response) => {
				response.status(200).send('OK');
			},
			Method: HttpRequestMethodEnum.GET,
		},
		TestV2: {
			Name: 'TestV2',
			Route: '/v2/test',
			Function: (request: Request, response: Response, next: NextFunction) => {
				return next(new Error('Test'));
				response.status(200).send('OK');
			},
			Method: HttpRequestMethodEnum.GET,
		},
	};
}
