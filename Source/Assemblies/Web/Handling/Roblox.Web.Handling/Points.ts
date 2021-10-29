import { RequestHandler } from 'express-serve-static-core';

export const Points = ((req, res, next) => {
	res.header({
		'cache-control': 'no-cache',
		pragma: 'no-cache',
		expires: '-1',
		p3p: 'CP="CAO DSP COR CURa ADMa DEVa OUR IND PHY ONL UNI COM NAV INT DEM PRE"',
		'roblox-machine-id': 'AWA-776',
	});
	if (req.headers['origin'] && req.headers['origin'] === 'https://www.sitetest4.robloxlabs.com') {
		res.setHeader('Access-Control-Allow-Origin', 'https://www.sitetest4.robloxlabs.com');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
	}
	next();
}) as RequestHandler;
