import { Request, Response } from 'express';

export const Tomcat404 = (request: Request, response: Response) => {
	return response.status(404).render('Tomcat404', { Model: { Path: request.path } });
};
