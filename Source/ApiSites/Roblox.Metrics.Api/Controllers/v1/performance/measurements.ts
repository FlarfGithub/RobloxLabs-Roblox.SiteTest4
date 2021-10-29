/*
	FileName: LoadPlaceInfo.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Load Place info script
			
	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

import { NextFunction, Request, Response } from 'express';
import { Task } from '../../../../../System/Threading/Task';
import { MetricsRequestProcessor } from '../../../../../Assemblies/Web/Metrics/Roblox.Web.Metrics/MetricsRequestProcessor';
import { ContentTypeValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ContentTypeValidator';
import { MethodValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';
import { ApiEmptyResponseModel } from '../../../../../Assemblies/Web/WebAPI/ApiEmptyResponseModel';
import { MeasurementRequest } from '../../../MeasurementRequest';
import { HttpRequestMethodEnum } from '../../../../../Assemblies/Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';

export default {
	method: 'all',
	func: async (
		request: Request<null, ApiEmptyResponseModel, MeasurementRequest[]>,
		response: Response<ApiEmptyResponseModel>,
		errorFunction: NextFunction,
	): Task<Response<ApiEmptyResponseModel> | void> => {
		const contentTypeValidatorClient = new ContentTypeValidator(response);
		const methodValidatorClient = new MethodValidator(response);

		if (methodValidatorClient.MultiValidate(request.method, ['POST', 'OPTIONS'], false) === HttpRequestMethodEnum.UNKNOWN) return;
		if (
			!contentTypeValidatorClient.MultiValidate(
				request.headers['content-type'],
				['application/json', 'application/x-www-form-urlencoded'],
				false,
			)
		)
			return;

		const requestProcessor = new MetricsRequestProcessor();

		try {
			await requestProcessor.BatchSendMeasurements(request.body);
			return response.status(200).send({});
		} catch (e) {
			return errorFunction(e);
		}
	},
};
