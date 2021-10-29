import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.send();
	},
};
