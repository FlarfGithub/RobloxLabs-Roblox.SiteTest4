import { Request, Response } from 'express';
import { HttpRequestMethodEnum } from '../../../Assemblies/Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';

export namespace Roblox.ComApis.Api.Controllers {
	export const ApiUpstreamController = {
		Name: 'ApiUpstreamController',
		Route: '[comName]',
		IsController: true,
		Index: {
			Name: 'CheckApiSpecificInternalUpstream',
			Route: '/checkapis-upstream',
			Function: (request: Request, response: Response) => {
				response.status(200).send({
					WasSuccessful: true,
					Detail: 'OK',
					InnerException: null,
					StackTrace: null,
					Source: 'ApiUpstreamController',
					TargetSite: 'String CheckApiSpecificInternalUpstream(String, Nullable`1[Int32])',
					Data: null,
				});
			},
			Method: HttpRequestMethodEnum.GET,
		},
	};
}
