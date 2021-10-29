import { Request, Response } from 'express';

export const Nomad404 = (request: Request, response: Response) => {
	if (request.url.startsWith('/ui')) return response.render('UI');

	response.status(404).send();
};
