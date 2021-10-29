/*
	FileName: MultiIncrememnt.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Increment multiple counters

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

import { Request, Response } from 'express';
import { EphemeralCountersService } from '../../../../Assemblies/ApiServices/Roblox.EphemeralCounters.Service/Roblox.EphemeralCounters.Service/EphemeralCountersService';
import { HttpRequestMethodEnum } from '../../../../Assemblies/Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';
import { ErrorsClient } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/ErrorsClient';
import { ContentTypeValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/ContentTypeValidator';
import { MethodValidator } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';
import { ICounter } from '../../Models/ICounter';
import { MultiIncrementRequest } from '../../Models/MultiIncrementRequest';

export default {
	method: 'all',
	func: async (request: Request<null, null, MultiIncrementRequest, null>, response: Response): Promise<void> => {
		const errorsClient = new ErrorsClient(response);
		const contentTypeValidatorClient = new ContentTypeValidator(response, request.body !== undefined);
		const methodValidatorClient = new MethodValidator(response);

		if (methodValidatorClient.Validate(request.method, 'POST', true) === HttpRequestMethodEnum.UNKNOWN) return;
		if (
			!contentTypeValidatorClient.MultiValidate(
				request.headers['content-type'],
				['application/json', 'text/json', 'application/x-www-form-urlencoded'],
				true,
			)
		)
			return;
		if (!request.body) {
			return errorsClient.RespondWithAServiceError(500, 'An error has occured.', true);
		}
		if (!request.body.counterNamesCsv) {
			return errorsClient.RespondWithAServiceError(500, 'An error has occured.', true);
		}
		const counters: ICounter[] = [];

		const counterNamesCsv = request.body.counterNamesCsv.split(',');

		counterNamesCsv.forEach((counterName) => {
			counters.push({
				Name: counterName,
				Amount: 1,
			});
		});
		return await EphemeralCountersService.HandleBatchIncrementCounters(counters, response);
	},
};
