import { RequestHandler } from 'express-serve-static-core';

export const UsersApi = ((_req, response, next) => {
	response.header('Roblox-Machine-Id', 'AWA-1991');
	next();
}) as RequestHandler;
