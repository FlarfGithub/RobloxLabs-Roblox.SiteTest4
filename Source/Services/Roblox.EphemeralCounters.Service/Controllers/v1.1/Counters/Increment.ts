/*
	FileName: Increment.ts
	Written By: GithubPagesStuff
	File Type: Module
	Description: Increment a single counter

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

import { EphemeralCountersService } from '../../../../../Assemblies/ApiServices/Roblox.EphemeralCounters.Service/Roblox.EphemeralCounters.Service/EphemeralCountersService';
import { Request, Response } from 'express';
import { IncrementRequest } from '../../../Models/IncrementRequest';
import { MethodValidator } from '../../../../../Assemblies/Web/Util/Roblox.Web.Util/Validators/MethodValidator';
import { HttpRequestMethodEnum } from '../../../../../Assemblies/Http/Roblox.Http/Enumeration/HttpRequestMethodEnum';

export default {
	method: 'all',
	func: async (request: Request<null, any, any, IncrementRequest>, response: Response) => {
		const methodValidatorClient = new MethodValidator(response);

		if (!request.query.counterName)
			return response.status(404).send({
				Message: `No HTTP resource was found that matches the request URI '${request.protocol}://${request.hostname}${request.url}'.`,
			});
		if (methodValidatorClient.Validate(request.method, 'POST', true) === HttpRequestMethodEnum.UNKNOWN) return;

		await EphemeralCountersService.HandleIncrementCounter(
			request.query.counterName,
			parseInt(<string>(<unknown>request.query.amount)),
			response,
		);
	},
};
