import { Request, Response } from 'express';

export const NotFoundRedirect = (request: Request, response: Response) => {
	return response.redirect('https://www.sitetest4.robloxlabs.com' + request.url);
};
