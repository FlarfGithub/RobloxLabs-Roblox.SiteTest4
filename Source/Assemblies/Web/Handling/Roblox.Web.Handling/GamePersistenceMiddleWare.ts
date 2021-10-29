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

import { RequestHandler } from 'express-serve-static-core';
import { FASTLOG5, FLog, LOGGROUP } from '../../Util/Roblox.Web.Util/Logging/FastLog';
import { CommonValidator } from '../../Util/Roblox.Web.Util/Validators/CommonValidator';

LOGGROUP('GumePersistince');

export const GamePersistenceMiddleware = ((req, res, next) => {
	const commonValidatorClient = new CommonValidator(res);

	let cookie = req.headers.cookie;
	if (cookie === undefined) cookie = '';
	cookie = (cookie as string).split(';').find((secToken) => {
		return secToken.startsWith(' RobloxSecurityToken') || secToken.startsWith('RobloxSecurityToken');
	});
	if (cookie) cookie = cookie.split('=')[1];
	if (
		!commonValidatorClient.ValidateDoesTheWorldGetToViewTheSite(
			req.method,
			encodeURIComponent(`${req.protocol}://${req.hostname}${req.url}`),
			cookie || <string>req.headers['roblox-security-token'],
			true,
		)
	)
		return res.status(503).send({ errors: [{ code: 0, message: 'Service Undergoing Maintenance' }] });
	FASTLOG5(
		FLog['GumePersistince'],
		`[FLog::GumePersistince] %s REQUEST ON %s://%s%s FROM %s`,
		req.method.toUpperCase(),
		req.protocol,
		req.hostname,
		req.url,
		req.headers['user-agent'].toUpperCase(),
	);
	res.header({
		expires: -1,
		p3p: ' CP="CAO DSP COR CURa ADMa DEVa OUR IND PHY ONL UNI COM NAV INT DEM PRE"',
		pragma: ' no-cache',
		'roblox-machine-id': 'CHI1-WEB7761',
		'x-frame-options': 'SAMEORIGIN',
		'x-powered-by': 'ASP.NET',
		'cache-control': 'no-cache',
	});

	next();
}) as RequestHandler;
