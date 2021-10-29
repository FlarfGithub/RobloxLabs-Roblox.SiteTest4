import { RequestHandler } from 'express-serve-static-core';

export const EphemeralCountersApi = ((_request, response, next) => {
	response.header({
		Server: 'nginx',
		expires: -1,
		p3p: 'CP="CAO DSP COR CURa ADMa DEVa OUR IND PHY ONL UNI COM NAV INT DEM PRE"',
		pragma: 'no-cache',
		'Roblox-Machine-Id': 'AWA-WEB1257',
	});
	next();
}) as RequestHandler;
