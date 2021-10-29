/*
	FileName: pbe.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Analytics, for ecsv2

	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	NOTICE DO NOT PUT CSRF PROTECTION ON THIS!

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
import { FASTLOGS, FLog, LOGGROUP } from '../../../../Assemblies/Web/Util/Roblox.Web.Util/Logging/FastLog';

LOGGROUP('EphemeralCountersV2');

export default {
	method: 'all',
	func: (request: Request<null, string, any>, response: Response<string>): void => {
		FASTLOGS(FLog['EphemeralCountersV2'], '[FLog::EphemeralCountersV2] %s', JSON.stringify(request.query));
		FASTLOGS(FLog['EphemeralCountersV2'], '[FLog::EphemeralCountersV2] %s', JSON.stringify(request.body));
		response.send();
	},
};
