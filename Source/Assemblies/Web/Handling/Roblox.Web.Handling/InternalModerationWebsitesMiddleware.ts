/*
	FileName: init_middleware.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Global middleware that is executed before each request, changes to this will affect all servers

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
import { RequestHandler } from 'express-serve-static-core';
import { Account } from '../../../Server Class Library/Roblox Class Library/Business Logic Layer/Account';
import { FASTLOG5, FLog, LOGGROUP } from '../../Util/Roblox.Web.Util/Logging/FastLog';

LOGGROUP('TheInternalSystem');

export const InternalModerationWebsitesMiddleware = ((
	request: Request<any, any, any, any, any>,
	response: Response<any, any>,
	nextHandler: NextFunction,
) => {
	try {
		const userAccount = new Account();
		if (!userAccount) return;
		FASTLOG5(
			FLog['TheInternalSystem'],
			`[FLog::TheInternalSystem] %s REQUEST ON %s://%s%s FROM %s`,
			request.method.toUpperCase(),
			request.protocol,
			request.hostname,
			request.url,
			request.headers['user-agent'].toUpperCase(),
		);
		response.header({
			expires: -1,
			p3p: ' CP="CAO DSP COR CURa ADMa DEVa OUR IND PHY ONL UNI COM NAV INT DEM PRE"',
			pragma: ' no-cache',
			'roblox-machine-id': 'AWA-WEB8123',
			'x-frame-options': 'SAMEORIGIN',
			'x-powered-by': 'ASP.NET',
			'cache-control': 'no-cache',
		});

		nextHandler();
	} catch (e) {
		nextHandler(e);
	}
}) as RequestHandler<any, any, any, any, any>;
