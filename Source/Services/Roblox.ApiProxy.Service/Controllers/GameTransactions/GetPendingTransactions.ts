import { Request, Response } from 'express';

export default {
	method: 'all',
	func: (_request: Request<null, any>, response: Response<any>): Response<any> => {
		return response.status(200).send([]);
	},
};
