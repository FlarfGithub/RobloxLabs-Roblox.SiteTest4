import { RequestHandler } from 'express-serve-static-core';

export const DataWebsite = ((req, res, next) => {
	res.header({
		'roblox-machine-id': 'AWA-1313',
	});
	if (req.headers['origin'] && req.headers['origin'] === 'https://www.sitetest4.robloxlabs.com') {
		res.setHeader('Access-Control-Allow-Origin', 'https://www.sitetest4.robloxlabs.com');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
	}
	next();
}) as RequestHandler;
