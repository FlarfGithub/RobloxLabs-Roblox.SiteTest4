import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.status(200).contentType('text/plain').send('"10.106.0.5:4647"');
	},
};
