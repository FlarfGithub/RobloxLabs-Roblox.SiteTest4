import { RequestHandler } from 'express-serve-static-core';
import { BaseURL } from '../../../Common/Roblox.Common/BaseUrl';
import { FASTLOG5, DFLog, DYNAMIC_LOGGROUP } from '../../Util/Roblox.Web.Util/Logging/FastLog';

DYNAMIC_LOGGROUP('Protocol77');

export const ApiProxyHandler = ((request, response, next) => {
	FASTLOG5(
		DFLog('Protocol77'),
		`[DFLog::Protocol77] %s REQUEST ON %s://%s%s FROM %s`,
		request.method.toUpperCase(),
		request.protocol,
		request.hostname,
		request.url,
		(request.headers['user-agent'] || '').toUpperCase(),
	);
	response.header({
		'roblox-machine-id': 'AWA-1313',
		p3p: 'CP="CAO DSP COR CURa ADMa DEVa OUR IND PHY ONL UNI COM NAV INT DEM PRE"',
		'x-powered-by': 'ASP.NET',
		'x-aspnet-version': '4.0.30319',
		server: 'Microsoft-IIS/8.5',
	});
	if (request.method === 'OPTIONS')
		return response
			.header({
				public: 'OPTIONS, TRACE, GET, HEAD, POST, DELETE, PATCH',
				'x-frame-options': 'SAMEORIGIN',
				'x-aspnetmvc-version': 5.2,
				allow: 'OPTIONS, TRACE, GET, HEAD, POST, DELETE, PATCH',
				vary: 'Accept-Encoding',
			})
			.status(200)
			.send({
				Success: true,
			});
	if (request.headers['origin'] && request.headers['origin'] === BaseURL.ConstructServicePathFromSubDomainSimple('www', '/', true)) {
		response.setHeader('Access-Control-Allow-Origin', 'https://www.sitetest4.robloxlabs.com');
		response.setHeader('Access-Control-Allow-Credentials', 'true');
	}
	next();
}) as RequestHandler;
