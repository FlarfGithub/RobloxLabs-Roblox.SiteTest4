import { NextFunction, Request, Response } from 'express';

export default {
	method: 'all',
	func: async (request: Request, response: Response, next: NextFunction) => {
		return response.send({ Regex: '^\\w+([-_+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$' });
	},
};
