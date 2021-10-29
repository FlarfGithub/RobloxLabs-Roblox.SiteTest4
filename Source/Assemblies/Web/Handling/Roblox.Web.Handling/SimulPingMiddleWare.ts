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
import { OriginMaster } from '../../Util/Roblox.Web.Util/OriginMaster';

LOGGROUP('SIMPLEPING');

export const SimulPingMiddleware = ((req, res, next) => {
	FASTLOG5(
		FLog['SIMPLEPING'],
		`[FLog::SIMPLEPING] %s REQUEST ON %s://%s%s FROM %s`,
		req.method.toUpperCase(),
		req.protocol,
		req.hostname,
		req.url,
		req.headers['user-agent'].toUpperCase(),
	);
	if ((req.path === '/recipe' || req.path === '/report') && req.hostname === 'lms.simulpong.com') {
		const om = new OriginMaster(res);
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Referer, X-Requested-With, Content-Type, X-CSRF-TOKEN, Pragma, Cache-Control, expires',
		);
		res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
		om.ExecuteOriginCheck(req.headers['origin'], req.protocol);
	}
	if (!req.headers.cookie && req.hostname === 'rcity.simulpong.com' && req.path.toLocaleLowerCase() === '/') {
		return res.redirect('https://rcity.simulpong.com/Login/');
	}
	if (
		req.headers.cookie &&
		!req.headers.cookie.includes('TEAM-CITY-AUTH') &&
		req.hostname === 'rcity.simulpong.com' &&
		req.path.toLocaleLowerCase() === '/'
	) {
		return res.redirect('https://rcity.simulpong.com/Login?ReturnUrl=' + encodeURI(req.path));
	}
	if (
		req.headers.cookie &&
		req.headers.cookie.includes('TEAM-CITY-AUTH') &&
		req.hostname === 'rcity.simulpong.com' &&
		(req.path.toLowerCase() === '/login' || req.path.toLowerCase() === '/login/')
	) {
		return res.redirect('https://rcity.simulpong.com');
	}

	next();
}) as RequestHandler;
