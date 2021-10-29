import { RequestHandler } from 'express-serve-static-core';

export const PointsApi = ((_req, res, next) => {
	res.header('Roblox-Machine-Id', 'AWA-987');
	next();
}) as RequestHandler;
