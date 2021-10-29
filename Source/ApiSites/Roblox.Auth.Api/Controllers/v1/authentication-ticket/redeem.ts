import { Request, Response } from 'express';

export default {
	method: 'all',
	func: (_request: Request, response: Response) => {
		return response.header('rbx-authentication-ticket', 'lol').send();
	},
};
