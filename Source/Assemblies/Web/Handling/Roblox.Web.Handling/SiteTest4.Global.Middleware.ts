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

import crypto from 'crypto';
import headers from '../../../Common/Constants/Roblox.Common.Constants/DefaultHeaders';
import { RequestHandler } from 'express-serve-static-core';
import { DFFlag, DFLog, DYNAMIC_LOGGROUP, FASTLOG2, FASTLOG5 } from '../../Util/Roblox.Web.Util/Logging/FastLog';
import { CommonValidator } from '../../Util/Roblox.Web.Util/Validators/CommonValidator';
import { DateTimeConverter } from '../../Util/Roblox.Web.Util/Converters/DateTimeConverter';
import { OriginMaster } from '../../Util/Roblox.Web.Util/OriginMaster';
import { KeyValueMapping } from '../../../Common/Mapping/Roblox.Common.Mapping/KeyValueMapping';

DYNAMIC_LOGGROUP('Protocol77');
DYNAMIC_LOGGROUP('Tasks');

export const GlobalMiddleware = ((request, response, nextExecutingContext) => {
	const commonValidatorClient = new CommonValidator(response);

	const tracker = KeyValueMapping.GetValuesFromCookieString(['RBXEventTrackerV2', 'RBXEventTracker'], request.headers.cookie);
	if (!tracker)
		response.cookie(
			'RBXEventTrackerV2',
			`CreateDate=${DateTimeConverter.DateToLocaleDate(new Date(Date.now()))}&rbxid=&browserid=${1}`, // Keep the browserid as 1 for now.
			{
				maxAge: 946100000000,
				domain: 'sitetest4.robloxlabs.com',
				encode: (val) => val, // No encoding
			},
		);
	// TODO Move this to it's own middleware.
	if (
		(request.path.toLowerCase() !== '/login/maintenance' &&
			request.hostname !== 'apis.sitetest4.robloxlabs.com' &&
			request.hostname !== 'ecsv2.sitetest4.robloxlabs.com' &&
			request.hostname !== 'metrics.sitetest4.robloxlabs.com' &&
			!request.path.startsWith('/js')) ||
		DFFlag('NoMaintenance')
	) {
		const cookie = KeyValueMapping.GetValueFromCookieString('RobloxSecurityToken', request.headers.cookie);
		if (
			!commonValidatorClient.ValidateDoesTheWorldGetToViewTheSite(
				request.method,
				encodeURIComponent(`${request.protocol}://${request.hostname}${request.url}`),
				cookie || <string>request.headers['roblox-security-token'],
				DFFlag('NoMaintenance'),
				DFFlag('NoMaintenance'),
			)
		)
			return;
	}

	FASTLOG5(
		DFLog('Protocol77'),
		`[DFLog::Protocol77] %s REQUEST ON %s://%s%s FROM %s`,
		request.method.toUpperCase(),
		request.protocol,
		request.hostname,
		request.url,
		request.headers['user-agent'] || '',
	);
	response.header(headers);
	if (!request.headers.cookie || (!request.headers.cookie.match(/__tid/) && request.hostname === 'www.sitetest4.robloxlabs.com'))
		response.cookie('__tid', crypto.createHash('sha256').update(crypto.randomBytes(1000)).digest('hex'), {
			maxAge: 3.154e14,
			domain: 'sitetest4.robloxlabs.com',
		});
	response.header(
		'Access-Control-Allow-Headers',
		'Origin, Referer, X-Requested-With, Content-Type, X-CSRF-TOKEN, Pragma, Cache-Control, expires',
	);
	response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
	try {
		const om = new OriginMaster(response);
		om.ExecuteOriginCheck(request.headers['origin'], request.protocol);
	} catch (e) {
		FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Message: %s, Stack: %s`, e.message, e.stack);
	}
	if (request.method !== 'GET') {
		try {
			// let cookie = req.headers.cookie;
			// if (cookie === undefined) cookie = '';
			// cookie = (cookie as string).split(';').find((AuthToken) => {
			// 	return AuthToken.startsWith(' AuthToken') || AuthToken.startsWith('AuthToken');
			// });
			// if (
			// 	!CreateOrGetXsrfSession(
			// 		typeof cookie !== 'string' ? '' : cookie.split('=')[1],
			// 		req.ip,
			// 		req.headers['x-csrf-token'],
			// 		res,
			// 		req.hostname === 'api.sitetest4.robloxlabs.com' && req.path === '/csrf/v1/get-csrf-token',
			// 	)
			// )
			// 	return;
		} catch (e) {
			FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Message: %s, Stack: %s`, e.message, e.stack);
		}
	}

	// TODO: Validate AuthToken before we redirect, it may be hacked
	if (
		request.headers['user-agent'] &&
		request.headers['user-agent'].includes('RobloxStudio') &&
		request.hostname === 'www.sitetest4.robloxlabs.com' &&
		request.path.toLowerCase() === '/'
	) {
		return response.redirect('http://www.sitetest4.robloxlabs.com/roblox.html');
	}

	// if (
	// 	req.hostname === 'www.sitetest4.robloxlabs.com' &&
	// 	StripTheTrailingSlash(req.path.toLowerCase()) === '/login/maintenance' &&
	// 	ValidateDoesTheWorldGetToViewTheSite(
	// 		req.method,
	// 		encodeURIComponent(`${req.protocol}://${req.hostname}${req.url}`),
	// 		<string>req.headers['roblox-security-token'],
	// 		res,
	// 		true,
	// 	)
	// ) {
	// 	return res.redirect('https://www.sitetest4.robloxlabs.com/');
	// }
	// if (
	// 	req.headers.cookie &&
	// 	!req.headers.cookie.includes('.ROBLOSECURITY') &&
	// 	!req.headers.cookie.includes('AuthToken') &&
	// 	(req.hostname === 'www.sitetest4.robloxlabs.com' || req.hostname === 'sitetest4.robloxlabs.com') &&
	// 	req.path.toLocaleLowerCase() !== '/login/' &&
	// 	req.path.toLocaleLowerCase() !== '/login' &&
	// 	StripTheTrailingSlash(req.path).toLocaleLowerCase() !== '/login/maintenance' &&
	// 	StripTheTrailingSlash(req.path).toLocaleLowerCase() !== '/login/twostepverification' &&
	// 	req.path !== '/' &&
	// 	req.path !== '/roblox.html' &&
	// 	StripTheTrailingSlash(req.path).toLocaleLowerCase() !== '/authentication/login.ashx'
	// ) {
	// 	return res.redirect('https://www.sitetest4.robloxlabs.com/Login/');
	// }
	// if (
	// 	req.headers.cookie &&
	// 	req.headers.cookie.includes('.ROBLOSECURITY') &&
	// 	req.hostname === 'www.sitetest4.robloxlabs.com' &&
	// 	(req.path.toLowerCase() === '/login' || req.path.toLowerCase() === '/login/' || req.path === '/')
	// ) {
	// 	return res.redirect('https://www.sitetest4.robloxlabs.com/home');
	// }

	nextExecutingContext();
}) as RequestHandler;
